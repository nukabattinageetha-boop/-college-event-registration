
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const registerStudent = async (req, res) => {
  try {
    const { eventId, studentName, email, phone } = req.body;

    if (!eventId || !studentName || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (new Date(event.date) <= new Date()) {
      return res.status(400).json({ message: "Registration closed" });
    }

    const count = await Registration.countDocuments({ eventId });

    if (count >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const registration = await Registration.create({
      eventId, studentName, email, phone
    });

    res.status(201).json({
      message: "Registration successful!",
      registration
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Already registered!" });
    }

    res.status(500).json({ message: error.message });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("eventId", "title date");

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
