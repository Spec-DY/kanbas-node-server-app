import db from "../Database/index.js";
export default function AssignmentsRoutes(app) {

    app.put("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        const assignmentsIndex = db.assignments.findIndex(
          (m) => m._id === mid);
        db.assignments[assignmentsIndex] = {
          ...db.assignments[assignmentsIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    

    app.delete("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        db.assignments = db.assignments.filter((m) => m._id !== mid);
        res.sendStatus(200);
      });
    

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignments = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignments);
        res.send(newAssignments);
      });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((m) => m.course === cid);
        res.json(assignments);
    });
}
