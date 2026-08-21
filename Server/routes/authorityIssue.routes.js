import express from "express";
import {
    getAuthorityIssues,
    getAuthorityIssueById,
} from "../controller/authorityIssue.controller.js";
import {
    requireAuthority,
    requirePermission,
} from "../middleware/authority.middleware.js";

const router = express.Router();

router.use(requireAuthority);
router.get(
    "/",
    requirePermission("viewIssues"),
    getAuthorityIssues
);
router.get(
    "/:issueId",
    requirePermission("viewIssues"),
    getAuthorityIssueById
);

export default router;