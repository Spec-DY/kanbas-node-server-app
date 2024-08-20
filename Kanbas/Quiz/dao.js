import QuizModel from "./model.js";

export const createQuiz = (quiz) => QuizModel.create(quiz);
export const findQuizzesByCourse = (courseId) => QuizModel.find({ courseId: courseId });
export const findQuizById = (quizId) => QuizModel.findById(quizId).populate("courseId");
export const updateQuiz = (quizId, quiz) => QuizModel.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => QuizModel.deleteOne({ _id: quizId });
