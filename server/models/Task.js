import mongoose from "mongoose";

/**
 * Task Schema - Stores tasks assigned to agents
 * Each task is linked to an agent and contains customer information
 */
const taskSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Customer first name is required"],
      trim: true,
      minlength: [1, "First name cannot be empty"],
      maxlength: [100, "First name cannot exceed 100 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: [true, "Assigned agent is required"],
      index: true, // Improves query performance
    },
  },
  {
    timestamps: true,
  }
);

// Add index for common queries
taskSchema.index({ createdAt: -1 });
taskSchema.index({ assignedAgent: 1, createdAt: -1 });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;