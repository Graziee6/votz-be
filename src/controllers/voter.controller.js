import jwt from "jsonwebtoken";

import connection from "../config/db.js";

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
      `SELECT * FROM voter WHERE email='${email}' OR nid='${nid}' OR phone='${phone}'`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length > 0) {
          res.status(400).json({ error: "voter already exists." });
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
  } catch (error) {
    console.error(error);
  }
};

export const VoterLogin = async (req, res) => {
  try {
    //1.Validate body
    const { err } = req.body;
    if (err) {
      return res.status(400).send({ message: "Bad request" });
    }
    let { email } = req.body;
    //2.Check db for such a user
    connection.query(
      `SELECT * FROM voter WHERE email='${email}'`,
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
        const voter = results[0];

        // Generate a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          { id: voter.id, names: voter.names },
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

export const vote = async (req, res) => {
  try {
    const voteCount = 0;
    const { candidate_nid } = req.params;

    connection.query(
      `SELECT * FROM candidate WHERE nid='?'`,
      [candidate_nid],
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        if (results.length() > 0) {
          console.log(results);
          voteCount += 1;
          const candidateId = results[0].candidateId;
          connection.query(
            `INSERT INTO votes(votes, candidateId) VALUES(?, ?)`,
            [voteCount, candidateId],
            async (error, results) => {
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

export const GetAllCandidates = async (req, res) => {
  try {
    connection.query(
      `SELECT c.names, c.mission, c.nid, g.gender FROM candidate c, gender g WHERE c.gender=g.id`,
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        return res.json(results);
      }
    );
  } catch (error) {
    console.error(error);
  }
};
