import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied; token missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, pass) => {
    if (err) {
      return res.status(403).json({ error: "Access denied; invalid token" });
    }
    req.user = pass;
    next();
  });
};
export default authToken;
