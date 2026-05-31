import Task from "../models/Task.js";

/**
 * Get all tasks grouped by assigned agent
 * @route GET /api/tasks
 */
export const getTasks = async (req, res) => {
  try {
    // Fetch tasks with agent details (excluding sensitive data)
    const tasks = await Task.find()
      .populate("assignedAgent", "name email mobile")
      .sort({ createdAt: -1 });

    // Handle empty result
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,
        tasks: {},
        message: "No tasks found",
      });
    }

    // Group tasks by agent name
    const groupedTasks = {};

    for (const task of tasks) {
      // Skip tasks with no assigned agent
      if (!task.assignedAgent || !task.assignedAgent.name) {
        continue;
      }

      const agentName = task.assignedAgent.name;

      if (!groupedTasks[agentName]) {
        groupedTasks[agentName] = [];
      }

      groupedTasks[agentName].push(task);
    }

    // Send success response
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks: groupedTasks,
    });

  } catch (error) {
    console.error("Get tasks error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};