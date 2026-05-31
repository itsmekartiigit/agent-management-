import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getTasks } from "../controllers/taskController.js";

const taskRouter = express.Router();

/**
 * Task Routes
 * All task endpoints are protected with authentication
 */

// Get all tasks (grouped by agent) - Protected route
taskRouter.get("/list", authMiddleware, getTasks);

export default taskRouter;