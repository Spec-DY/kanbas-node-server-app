import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    // get all quiz by course
    app.get("/api/courses/:courseId/quizzes", async (req, res) => {
        console.log("start get quiz...");
        const { courseId } = req.params;
        console.log("courseID:", courseId);
        const quizzes = await dao.findQuizzesByCourse(courseId);
        res.json(quizzes);
    });

    // in progress

    // Update a quiz
    app.put("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizData = req.body;
        const updatedQuiz = await dao.updateQuiz(quizId, quizData);
        if (updatedQuiz) {
            res.json(updatedQuiz);
        } else {
            res.status(404).send("Quiz not found");
        }
    });

    // Delete a quiz
    app.delete("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.json(status);
    });

    // Create a new quiz for a course
    app.post("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        const quizData = req.body;
        const newQuiz = {
            ...quizData,
            courseId: courseId,  // quiz associated with the course
        };
        const createdQuiz = await dao.createQuiz(newQuiz);
        res.status(201).json(createdQuiz);
    });
}