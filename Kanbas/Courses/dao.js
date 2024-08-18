import CourseModel from "./model.js";
import UserModel from "../../Users/model.js";

// Create a new course
export const createCourse = (course) => CourseModel.create(course);

// Find all courses
export const findAllCourses = () => CourseModel.find();

// Find a course by ID
export const findCourseById = (courseId) => CourseModel.findById(courseId);

// Update a course by ID
export const updateCourse = (courseId, course) => 
    CourseModel.updateOne({ _id: courseId }, { $set: course });

// Delete a course by ID
export const deleteCourse = (courseId) => 
    CourseModel.deleteOne({ _id: courseId });

// Find all courses created by a faculty member
export const findCoursesByCreator = (userId) => {
    return CourseModel.find({ author: userId });
};

// Find all courses a student is enrolled in
export const findCoursesByEnrollment = async (userId) => {
    const user = await UserModel.findById(userId).populate('enrolledCourses');
    return user.enrolledCourses;
};
