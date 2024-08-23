import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    quizAttempts: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizModel' },
        attemptsLeft: Number,
        answers: [String],
        score: Number,
        lastAttemptAt: Date,
      }],
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" }], // Courses for students
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" }], // Courses for faculty
  },
  { collection: "users" }
);

export default userSchema;
