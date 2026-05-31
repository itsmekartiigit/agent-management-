import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import agentRouter from "./routes/agentRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/tasks", taskRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});