import express from "express";

import {
  createWorkman,
  getAllWorkmen,
  getWorkmanById,
  updateWorkman,
  toggleWorkmanStatus,
} from "../controller/workman.controller.js";

import {
  requireAuthority,
  requireRole,
} from "../middleware/authority.middleware.js";

const router = express.Router();

// =========================
// CONTRACTOR MANAGEMENT
// =========================

// POST /api/authority/workmen
router.post(
  "/",
  requireAuthority,
  createWorkman
);

// GET /api/authority/workmen
router.get(
  "/",
  requireAuthority,
  getAllWorkmen
);

// GET /api/authority/workmen/:id
router.get(
  "/:id",
  requireAuthority,
  getWorkmanById
);

// PATCH /api/authority/workmen/:id
router.patch(
  "/:id",
  requireAuthority,
  updateWorkman
);

// PATCH /api/authority/workmen/:id/status
router.patch(
  "/:id/status",
  requireAuthority,
  toggleWorkmanStatus
);

export default router;