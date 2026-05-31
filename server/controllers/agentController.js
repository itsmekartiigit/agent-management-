import Agent from "../models/Agents.js";
import bcrypt from "bcryptjs";

// Helper: Basic email check
const isValidEmail = (email) => {
  return email && email.includes("@") && email.includes(".");
};

// Helper: Simple mobile check (10 digits)
const isValidMobile = (mobile) => {
  return mobile && /^[0-9]{10}$/.test(mobile);
};

// ========== ADD NEW AGENT ==========
export const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    // Check missing fields
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, mobile, password, confirmPassword) are required",
      });
    }

    // Email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Mobile format
    if (!isValidMobile(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be 10 digits",
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Password length (simple but practical)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if agent already exists (email OR mobile)
    const existingAgent = await Agent.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingAgent) {
      const field = existingAgent.email === email ? "Email" : "Mobile number";
      return res.status(409).json({
        success: false,
        message: `${field} already registered`,
      });
    }

    // Hash password and create agent
    const saltRounds = 10; // good enough for most cases
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const agent = await Agent.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      mobile: mobile.trim(),
      password: hashedPassword,
    });

    // Don't send password back
    const { password: _, ...agentWithoutPassword } = agent.toObject();

    res.status(201).json({
      success: true,
      message: "Agent added successfully",
      agent: agentWithoutPassword,
    });

  } catch (error) {
    console.error("Add agent error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ========== GET ALL AGENTS ==========
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find()
      .select("-password")
      .sort({ createdAt: -1 }); // newest first, feels natural

    if (!agents || agents.length === 0) {
      return res.status(200).json({
        success: true,
        agents: [],
        message: "No agents found",
      });
    }

    res.status(200).json({
      success: true,
      count: agents.length,
      agents,
    });

  } catch (error) {
    console.error("Get agents error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch agents. Please try again.",
    });
  }
};