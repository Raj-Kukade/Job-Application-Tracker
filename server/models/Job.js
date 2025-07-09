/* === server/models/Job.js === */
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: String,
  link: String,
  title: String,
  status: String,
  date: String
});

export default mongoose.model("Job", jobSchema);
