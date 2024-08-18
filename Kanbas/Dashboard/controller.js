import * as courseDao from "../Courses/dao.js";
import * as userDao from "../Users/dao.js";

export const getUserCourses = async (req, res) => {
    try {
        const userId = req.user._id;  // Assume user ID is set in req.user
        const user = await userDao.findUserById(userId);
        
        let courses;
        if (user.role === "FACULTY") {
            courses = await courseDao.findCoursesByFaculty(userId);
        } else if (user.role === "STUDENT") {
            courses = await courseDao.findCoursesByStudent(userId);
        } else {
            return res.status(403).send("Unauthorized");
        }

        res.json(courses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
