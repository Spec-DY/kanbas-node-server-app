import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String },
    description: {type: String},
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    quizType: { type: String, enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"], default: "Graded Quiz" },
    points: { type: Number, default: 0 },
    assignmentGroup: { type: String, enum: ["Quizzes", "Exams", "Assignments", "Project"], default: "Quizzes" },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },  // in minutes
    multipleAttempts: { type: Boolean, default: false },
    numberOfAttempts: { type: Number, default: 1 },  // only relevant if multipleAttempts is true
    showCorrectAnswers: { type: Boolean, default: true },  // can be a date or a boolean
    accessCode: { type: String },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date, default: 2024-8-31 },
    availableDate: { type: Date, default: 2024-8-10 },
    untilDate: { type: Date, default: 2024-9-10 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" }],
    isPublished: { type: Boolean, default: false }
}, { collection: "quiz" });

export default quizSchema;
