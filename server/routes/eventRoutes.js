import express from "express";
import {
  getEvents,
  addEvent,
  deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", addEvent);
router.delete("/:id", deleteEvent);

export default router;