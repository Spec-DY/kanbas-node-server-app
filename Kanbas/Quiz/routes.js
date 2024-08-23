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




    app.post("/api/quizzes/:quizId/submit", async (req, res) => {
        const { quizId } = req.params;
        const { answers } = req.body;
        const userId = req.session.currentUser._id;

        try {
            const user = await UserModel.findById(userId);
            const quiz = await dao.findQuizById(quizId);

            let quizAttempt = user.quizAttempts.find(
                (attempt) => attempt.quizId.toString() === quizId
            );

            if (!quizAttempt) {
                // Initialize quiz attempt
                quizAttempt = {
                    quizId: quizId,
                    attemptsLeft: quiz.numberOfAttempts - 1,
                    answers: [],
                    score: 0,
                    lastAttemptAt: new Date(),
                };
                user.quizAttempts.push(quizAttempt);
            } else if (quizAttempt.attemptsLeft > 0) {
                quizAttempt.attemptsLeft -= 1;
                quizAttempt.lastAttemptAt = new Date();
            } else {
                return res.status(400).json({ message: "No attempts left." });
            }

            // Calculate score (implement your scoring logic here)
            const score = calculateScore(quiz, answers); // This function needs to be implemented

            // Update quiz attempt
            quizAttempt.answers = answers;
            quizAttempt.score = score;

            await user.save();

            res.json({ score, attemptsLeft: quizAttempt.attemptsLeft });
        } catch (err) {
            res.status(500).json({ message: "Error submitting quiz", error: err.message });
        }
    });

    // New: Get the student's quiz attempt info
    app.get("/api/quizzes/:quizId/attempts", async (req, res) => {
        const { quizId } = req.params;
        const userId = req.session.currentUser._id;

        try {
            const user = await UserModel.findById(userId);
            const quizAttempt = user.quizAttempts.find(
                (attempt) => attempt.quizId.toString() === quizId
            );

            if (quizAttempt) {
                res.json({
                    attemptsLeft: quizAttempt.attemptsLeft,
                    score: quizAttempt.score,
                    answers: quizAttempt.answers,
                    lastAttemptAt: quizAttempt.lastAttemptAt,
                });
            } else {
                res.json({ attemptsLeft: quiz.numberOfAttempts, score: null, answers: [] });
            }
        } catch (err) {
            res.status(500).json({ message: "Error fetching quiz attempt info", error: err.message });
        }
    }


)
;}

