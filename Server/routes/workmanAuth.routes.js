import express from "express";

import {
  login,
  logout,
  getMe,
} from "../controller/workman.auth.controller.js";

import {
  requireWorkman,
} from "../middleware/workman.middleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", requireWorkman, logout);

router.get("/me", requireWorkman, getMe);

export default router;