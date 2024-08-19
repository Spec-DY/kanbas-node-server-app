import mongoose from "mongoose";
import * as courseDao from "./dao.js";
import * as userDao from "../../Users/dao.js";

export default function CourseRoutes(app) {

  // Update an existing course
  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const courseId = new mongoose.Types.ObjectId(id);
    const course = req.body;
    await courseDao.updateCourse(courseId, course);
    res.sendStatus(204);
  });

  // Delete a course
  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const courseId = new mongoose.Types.ObjectId(id);
    await courseDao.deleteCourse(courseId);
    res.sendStatus(200);
  });

  // Create a new course and associate it with the faculty member who created it
  app.post("/api/courses", async (req, res) => {
    const { userId, ...courseData } = req.body; // get userid and course data

    // create course and set author as current user
    const createdCourse = await courseDao.createCourse({ ...courseData, author: userId });

    // Associate the course with the faculty member
    await userDao.addCreatedCourse(userId, createdCourse._id);

    res.send(createdCourse);
  });

  // Get all courses (Admin view)
  app.get("/api/courses", async (req, res) => {
    const courses = await courseDao.findAllCourses();
    res.send(courses);
  });

  // Get courses for the logged-in user
  app.get("/api/users/:userId/courses", async (req, res) => {
    console.log("fetching user courses");
    const { userId } = req.params;
    console.log("user id:", userId);
    const user = await userDao.findUserById(userId);

    if (user.role === "FACULTY") {
      const courses = await courseDao.findCoursesByCreator(userId);
      res.send(courses);
    } else if (user.role === "STUDENT") {
      const courses = await courseDao.findCoursesByEnrollment(userId);
      res.send(courses);
    } else {
      const courses =
      res.send(await courseDao.findAllCourses());
    }
  });

  // Enroll a student in a course
  app.post("/api/courses/:id/enroll", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Assuming the userId of the student is passed in the request body
    const courseId = new mongoose.Types.ObjectId(id);

    // Enroll the student in the course
    await userDao.addEnrolledCourse(userId, courseId);
    res.sendStatus(200);
  });

}
