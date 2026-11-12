import express from "express";
import {
  registerStudent,
  getRegistrations
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", registerStudent);
router.get("/", getRegistrations);

export default router;