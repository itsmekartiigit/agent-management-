import express from "express";
import {
  addAgent,
  getAgents,
} from "../controllers/agentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const agentRouter = express.Router();

agentRouter.post(
  "/add",
  authMiddleware,
  addAgent
);

agentRouter.get(
  "/list",
  authMiddleware,
  getAgents
);

export default agentRouter;