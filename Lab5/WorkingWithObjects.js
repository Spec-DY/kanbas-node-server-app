const assignment = {
    id: 1, title: "NodeJS Assignmentasadasd",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get("/lab5/assignment/score/:newScore", (req, res) => {
      const { newScore } = req.params;
      assignment.score = newScore;
      res.json(assignment);
    });
    
    app.get("/lab5/assignment/completed", (req, res) => {
      const { status } = req.query;
      if (status !== "true" && status !== "false") {
        return res.status(400).send("Invalid status.");
      }
      assignment.completed = status;
      res.json(assignment);

    });
  };
  