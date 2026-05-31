import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

/**
 * File Upload Routes
 * Handles Excel/CSV file uploads for task distribution
 */

// Upload and process Excel/CSV file - Protected route
uploadRouter.post("/file", authMiddleware, upload.single("file"), uploadFile);

export default uploadRouter;