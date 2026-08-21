import express from "express";

import {
  createIssue,
  getMyIssues,
  getIssueById,
  getNearbyIssues,
} from "../controllers/issue.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);


// Create a new civic issue
router.post("/", createIssue);


// Citizen's own reports
router.get("/my", getMyIssues);


// Nearby issues
router.get("/nearby", getNearbyIssues);


// Single issue
router.get("/:issueId", getIssueById);


export default router;