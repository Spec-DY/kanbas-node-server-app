import CourseModel from "./model.js";

export const createCourse = (course) => CourseModel.create(course);
export const findAllCourses = () => CourseModel.find();
export const findCourseById = (courseId) => CourseModel.findById(courseId);
export const updateCourse = (courseId, course) => 
    CourseModel.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => 
    CourseModel.deleteOne({ _id: courseId });
