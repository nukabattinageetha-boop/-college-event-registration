
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  studentName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true }
}, { timestamps: true });

registrationSchema.index(
  { eventId: 1, email: 1 },
  { unique: true }
);

export default mongoose.model("Registration", registrationSchema);
