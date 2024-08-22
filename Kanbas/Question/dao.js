import QuestionModel from "./model.js";

export const createQuestion = (question) => QuestionModel.create(question);

export const findQuestionsByQuiz = (quizId) => 
    QuestionModel.find({ quizId: quizId });


export const findQuestionById = (questionId) => QuestionModel.findById(questionId);

export const updateQuestion = (questionId, question) => 
    QuestionModel.updateOne({ _id: questionId }, { $set: question });

export const deleteQuestion = (questionId) => 
    QuestionModel.deleteOne({ _id: questionId });
