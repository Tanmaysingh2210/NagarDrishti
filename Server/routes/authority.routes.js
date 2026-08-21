import express from "express";
import {
    login,
    logout,
    getMe,
} from "../controllers/authority.controller.js";
import {
    requireAuthority,
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

export default router;