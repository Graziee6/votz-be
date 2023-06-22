import express from "express";
import {
  AddAdmin,
  AddCandidate,
  AddVoter,
  AdminLogin,
  
} from "../controllers/admin.controller.js";
import authToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", AddAdmin);
router.post("/login", AdminLogin);
router.post("/addCandidate", authToken, AddCandidate);
router.post("/addVoter", authToken, AddVoter);


export default router;
