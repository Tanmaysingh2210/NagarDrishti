import express from "express";
import {
    login,
    logout,
    getMe,
    createAuthority,
    getAllAuthorities,
    getAuthorityById,
    updateAuthority,
    toggleAuthorityStatus,
} from "../controller/authority.controller.js";
import {
    requireAuthority,
    requireRole,
} from "../middleware/authority.middleware.js";

const router = express.Router();

router.post(
    "/login",
    login
);

router.post(
    "/logout",
    requireAuthority,
    logout
);

router.get(
    "/me",
    requireAuthority,
    getMe
);

// =========================
// AUTHORITY MANAGEMENT
// =========================

// POST /api/authority
// CITY_ADMIN only
router.post(
    "/",
    requireAuthority,
    requireRole("CITY_ADMIN"),
    createAuthority
);


// GET /api/authority
// CITY_ADMIN only
router.get(
    "/",
    requireAuthority,
    requireRole("CITY_ADMIN"),
    getAllAuthorities
);


// GET /api/authority/:id
// CITY_ADMIN only
router.get(
    "/:id",
    requireAuthority,
    requireRole("CITY_ADMIN"),
    getAuthorityById
);


// PATCH /api/authority/:id
// CITY_ADMIN only
router.patch(
    "/:id",
    requireAuthority,
    requireRole("CITY_ADMIN"),
    updateAuthority
);


// PATCH /api/authority/:id/status
// CITY_ADMIN only
router.patch(
    "/:id/status",
    requireAuthority,
    requireRole("CITY_ADMIN"),
    toggleAuthorityStatus
);

export default router;