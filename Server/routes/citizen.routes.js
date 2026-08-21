import express from "express";

import {
  getMyProfile,
  updateMyProfile,
  updateMyLocation,
  updateMyPreferences,
} from "../controllers/citizen.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/me", getMyProfile);

router.patch("/me", updateMyProfile);

router.patch("/me/location", updateMyLocation);

router.patch("/me/preferences", updateMyPreferences);

export default router;