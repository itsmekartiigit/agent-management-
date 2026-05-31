import mongoose from "mongoose";

/**
 * Agent Schema - Stores agent information
 * Used for authentication and task assignment
 */
const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Agent name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Remove password when converting to JSON
agentSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema);

export default Agent;