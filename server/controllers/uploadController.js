import XLSX from "xlsx";
import Agent from "../models/Agents.js";
import Task from "../models/Task.js";
import { distributeTasks } from "../utils/distributeTasks.js";

/**
 * Upload and process Excel file, distribute tasks among agents
 * @route POST /api/upload
 */
export const uploadFile = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    // Read Excel file
    const workbook = XLSX.read(req.file.buffer, {
      type: "buffer",
    });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
    });

    // Check if file has data
    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "File is empty",
      });
    }

    // Validate required columns
    const columns = Object.keys(data[0]).map(
      (column) => column.trim()
    );

    const hasFirstName = columns.includes("FirstName") || columns.includes("First Name");
    
    if (!hasFirstName || !columns.includes("Phone") || !columns.includes("Notes")) {
      return res.status(400).json({
        success: false,
        message: "Required columns: FirstName/First Name, Phone, Notes",
      });
    }

    // Get all agents
    const agents = await Agent.find();

    // Check agent count (fixed the condition - was "agents.length < 0" which is impossible)
    if (!agents || agents.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Minimum 5 agents required",
      });
    }

    // Normalize records
    const records = data.map((item) => {
      const normalized = {};

      Object.keys(item).forEach((key) => {
        normalized[key.trim()] = item[key];
      });

      return {
        firstName: String(
          normalized.FirstName || normalized["First Name"] || ""
        ).trim(),
        phone: String(normalized.Phone || "").trim(),
        notes: String(normalized.Notes || "").trim(),
      };
    });

    // Filter out records with missing required fields
    const validRecords = records.filter(
      (record) => record.firstName && record.phone
    );

    if (validRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid records found (each record needs FirstName and Phone)",
      });
    }

    // Distribute and save tasks
    const distributedTasks = distributeTasks(validRecords, agents);
    await Task.insertMany(distributedTasks);

    // Remove console.log statements
    res.status(200).json({
      success: true,
      message: "Tasks distributed successfully",
      totalRecords: validRecords.length,
    });

  } catch (error) {
    console.error("File upload error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to process file",
    });
  }
};