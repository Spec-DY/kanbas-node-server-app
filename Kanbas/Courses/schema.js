import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  number: { type: String },
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  department: { type: String },
  credits: { type: Number },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  image: { type: String},
}, { collection: "courses" });

export default courseSchema;
