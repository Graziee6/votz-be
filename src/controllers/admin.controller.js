import jwt from "jsonwebtoken";

import connection from "../config/db.js";
import emailValidator from "../utils/emailValidator.js";
import phoneValidator from "../utils/phoneValidator.js";
import nidValidator from "../utils/nidValidator.js";
import namesValidator from "../utils/namesValidator.js";
import passwordValidator from "../utils/passwordValidator.js";
import genderValidator from "../utils/genderValidator.js";
import missionValidator from "../utils/missionValidator.js";

export const AddAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const { err } = req.body;

    if (err) {
      return res.status(400).send({ message: "Invalid data" });
    }
    let { names, password, address, email, phone, nid } = req.body;
    let addressId;

    if (!emailValidator(email)) {
      return res.status(400).send({ message: "Invalid email" });
    } else if (!phoneValidator(phone)) {
      return res.status(400).send({ message: "Invalid phone number" });
    } else if (!nidValidator(nid)) {
      return res.status(400).send({ message: "Invalid national ID" });
    } else if (!namesValidator(names)) {
      return res.status(400).send({ message: "Invalid names input" });
    } else if (!namesValidator(address)) {
      return res.status(400).send({ message: "Invalid address in Rwanda" });
    } else if (password && !passwordValidator(password)) {
      return res
        .status(400)
        .send({ message: "Password should at least be 8 characters" });
    }

    connection.query(
      `SELECT * FROM admin WHERE email='${email}' OR nid='${nid}' OR phone='${phone}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          res.status(400).json({ error: "Admin already exists." });
        }
      }
    );

    connection.query(
      `SELECT id FROM address WHERE address.address='${address}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          addressId = results[0].id;
          connection.query(
            `INSERT INTO admin(names, password, phone, nid, email, address) VALUES('${names}', '${password}', '${phone}', '${nid}', '${email}', '${addressId}')`,
            (error, results) => {
              if (error) {
                console.error("Error executing the query:", error);
                res.status(500).json({ error: "Internal server error" });
                return;
              }
              res.json(results);
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const AdminLogin = async (req, res) => {
  try {
    //1.Validate body
    const { err } = req.body;
    if (err) {
      return res.status(400).send({ message: "Bad request" });
    }
    let { email } = req.body;
    let { password } = req.body;
    //2.Check db for such a user
    connection.query(
      `SELECT * FROM admin WHERE email='${email}' AND password='${password}'`,
      async (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length === 0) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        const admin = results[0];

        // Generate a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          { id: admin.id, names: admin.names },
          jwtSecret,
          {
            expiresIn: "10h",
          }
        );

        return res
          .status(200)
          .send({ data: token, message: "Logged in successfully" });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const AddCandidate = async (req, res) => {
  try {
    // console.log(req.body);
    const { err } = req.body;

    if (err) {
      return res.status(400).send({ message: "Invalid data" });
    }

    //Get the request body
    let { names, gender, nid, mission } = req.body;
    let genderId;

   //Validate the different fields of the request body
    if (!nidValidator(nid)) {
      return res.status(400).send({ message: "Invalid national ID" });
    } else if (!namesValidator(names)) {
      return res.status(400).send({ message: "Invalid names input" });
    }
    else if (!genderValidator(gender)) {
      return res.status(400).send({ message: "Invalid gender input" });
    } 

    connection.query(
      `SELECT * FROM candidate WHERE nid='${nid}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          res.status(400).json({ error: "candidate already exists." });
        }
      }
    );

    connection.query(
      `SELECT id FROM gender WHERE gender.gender='${gender}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          genderId = results[0].id;
          connection.query(
            `INSERT INTO candidate(names, mission, nid, gender) VALUES('${names}', '${mission}', '${nid}', '${genderId}')`,
            (error, results) => {
              if (error) {
                console.error("Error executing the query:", error);
                res.status(500).json({ error: "Internal server error" });
                return;
              }
              res.json(results);
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const AddVoter = async (req, res) => {
  try {
    console.log(req.body);
    const { err } = req.body;

    if (err) {
      return res.status(400).send({ message: "Invalid data" });
    }
    let { names, address, email, phone, nid } = req.body;
    let addressId;

    if (!emailValidator(email)) {
      return res.status(400).send({ message: "Invalid email" });
    } else if (!phoneValidator(phone)) {
      return res.status(400).send({ message: "Invalid phone number" });
    } else if (!nidValidator(nid)) {
      return res.status(400).send({ message: "Invalid national ID" });
    } else if (!namesValidator(names)) {
      return res.status(400).send({ message: "Invalid names input" });
    } else if (!namesValidator(address)) {
      return res.status(400).send({ message: "Invalid address in Rwanda" });
    }

    connection.query(
      `SELECT * FROM voter   WHERE email='${email}' OR nid='${nid}' OR phone='${phone}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          res.status(400).json({ error: "Voter already exists." });
        }
      }
    );

    connection.query(
      `SELECT id FROM address WHERE address.address='${address}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          addressId = results[0].id;
          connection.query(
            `INSERT INTO voter(names, phone, nid, email, address) VALUES('${names}', '${phone}', '${nid}', '${email}', '${addressId}')`,
            (error, results) => {
              if (error) {
                console.error("Error executing the query:", error);
                res.status(500).json({ error: "Internal server error" });
                return;
              }
              res.json(results);
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

