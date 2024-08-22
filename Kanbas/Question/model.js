import mongoose from "mongoose";
import QuestionSchema from "./schema.js";

const QuestionModel = mongoose.model("Question", QuestionSchema);

export default QuestionModel;
