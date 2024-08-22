import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    
    // get number of all question
    const questions = await dao.findQuestionsByQuiz(quizId);
    const questionCount = questions.length;

    // generate new title
    const newTitle = `Question ${questionCount + 1}`;

    const question = { ...req.body, quizId, title: newTitle };
    const createdQuestion = await dao.createQuestion(question);
    
    res.status(201).json(createdQuestion);
  });

  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsByQuiz(quizId);
    res.json(questions);
});


// fetch single question
  app.get("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    if (question) {
      res.json(question);
    } else {
      res.status(404).send("Question not found");
    }
  });


  //update
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const updatedQuestion = await dao.updateQuestion(questionId, req.body);
    res.json(updatedQuestion);
  });

  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.deleteQuestion(questionId);
    res.json(status);
  });
}
