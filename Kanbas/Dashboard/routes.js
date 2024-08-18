import express from "express";
import { getUserCourses } from "./controller.js";

const router = express.Router();

// Route to get courses for the logged-in user
router.get("/api/dashboard/courses", getUserCourses);

export default router;
