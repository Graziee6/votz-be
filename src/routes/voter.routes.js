import express from "express";
import authToken from "../middlewares/verifyToken.js";
import { AddVoter } from "../controllers/admin.controller.js";
import { GetAllCandidates, VoterLogin } from "../controllers/voter.controller.js";

const router = express.Router();

router.post("/", AddVoter);
router.post("/login", VoterLogin);
router.get('/getAllCandidates', authToken, GetAllCandidates)

export default router;