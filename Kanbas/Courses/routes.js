import mongoose from "mongoose";
import * as courseDao from "./dao.js"; 

export default function CourseRoutes(app) {

  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const courseId = new mongoose.Types.ObjectId(id);
    const course = req.body;
    await courseDao.updateCourse(courseId, course);
    res.sendStatus(204);
  });

  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const courseId =new mongoose.Types.ObjectId(id);
    await courseDao.deleteCourse(courseId);
    res.sendStatus(200);
  });

  app.post("/api/courses", async (req, res) => {
    const course = { ...req.body };
    const createdCourse = await courseDao.createCourse(course);
    res.send(createdCourse);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await courseDao.findAllCourses();
    res.send(courses);
  });
  
}
