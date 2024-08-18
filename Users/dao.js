import model from "./model.js";

// Create a new user
export const createUser = (user) => {
    delete user._id;
    return model.create(user);
};

// Find all users
export const findAllUsers = () => model.find();

// Find users by role
export const findUsersByRole = (role) => model.find({ role: role });

// Find users by partial name
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

// Find a user by ID
export const findUserById = (userId) => model.findById(userId);

// Find a user by username
export const findUserByUsername = (username) => model.findOne({ username: username });

// Find a user by credentials
export const findUserByCredentials = (username, password) => model.findOne({ username, password });

// Update a user by ID
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

// Delete a user by ID
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// Add a course to the list of courses a faculty member has created
export const addCreatedCourse = (userId, courseId) => {
    return model.updateOne(
        { _id: userId, role: "FACULTY" },
        { $addToSet: { createdCourses: courseId } } // $addToSet ensures no duplicates
    );
};

// Add a course to the list of courses a student is enrolled in
export const addEnrolledCourse = (userId, courseId) => {
    return model.updateOne(
        { _id: userId, role: "STUDENT" },
        { $addToSet: { enrolledCourses: courseId } } // $addToSet ensures no duplicates
    );
};
