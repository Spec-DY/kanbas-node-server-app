import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },
  type: {
    type: String,
    enum: ["Multiple Choice", "True/False", "Fill in the Blanks"],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  choices: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],
  booleanAnswer: {
    type: Boolean
  },
  stringAnswers: [String],
  order:{type: Number}
}, { collection: "questions" });

export default QuestionSchema;
