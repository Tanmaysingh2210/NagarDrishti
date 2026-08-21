import express from "express";
import {
    createIssue,
    getMyIssues,
    getIssueById,
    getNearbyIssues,
    upvoteIssue,
    removeUpvote,
} from "../controller/issue.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.post("/", createIssue);
router.get("/my", getMyIssues);
router.get("/nearby", getNearbyIssues);
router.get("/:issueId", getIssueById);
router.post("/:issueId/upvote", upvoteIssue);
router.delete("/:issueId/upvote", removeUpvote);

export default router;