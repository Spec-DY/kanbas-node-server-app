import ModuleModel from "./model.js";
import CourseModel from "../Courses/model.js";

export const findAllModules = () => ModuleModel.find();

export const findModuleById = (moduleId) => ModuleModel.findById(moduleId);

export const updateModule = (moduleId, module) => 
    ModuleModel.updateOne({ _id: moduleId }, { $set: module });

export const deleteModule = (moduleId) => 
    ModuleModel.deleteOne({ _id: moduleId });

export const findCourseByNumber = (courseNumber) => {
    return CourseModel.findOne({ number: courseNumber });
};

export const createModule = (module) => {
    return ModuleModel.create(module);
};

export const findModulesByCourseId = (courseId) => {
    return ModuleModel.find({ course: courseId });
};
