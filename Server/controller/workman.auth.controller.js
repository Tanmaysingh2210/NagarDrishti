import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Workman from "../models/workman.js";

// =========================
// Generate JWT
// =========================

const generateToken = (workmanId) => {
  return jwt.sign(
    { userId: workmanId },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
};

// =========================
// Set Cookie
// =========================

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// =========================
// LOGIN
// POST /api/workman/login
// =========================

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone/email and password are required",
      });
    }

    const normalizedPhone = identifier.replace(/\D/g, "");
    const normalizedEmail = identifier.trim().toLowerCase();

    const workman = await Workman.findOne({
      $or: [
        { phone: normalizedPhone },
        { email: normalizedEmail },
      ],
    }).select("+passwordHash");

    if (!workman) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!workman.isActive) {
      return res.status(403).json({
        success: false,
        message: "Contractor account is inactive",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      workman.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(workman._id);
    setAuthCookie(res, token);

    workman.lastLogin = new Date();
    await workman.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",

      workman: {
        id: workman._id,
        contractorName: workman.contractorName,
        contractorCode: workman.contractorCode,
        ownerName: workman.ownerName,
        phone: workman.phone,
        email: workman.email,
        department: workman.department,
        status: workman.status,
        teamSize: workman.teamSize,
        jurisdiction: workman.jurisdiction,
      },
    });

  } catch (error) {
    console.error("Workman login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// =========================
// LOGOUT
// POST /api/workman/logout
// =========================

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Workman logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// =========================
// GET CURRENT CONTRACTOR
// GET /api/workman/me
// =========================

export const getMe = async (req, res) => {
  try {
    const workman = await Workman.findById(req.user._id);

    if (!workman) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    return res.status(200).json({
      success: true,
      workman,
    });

  } catch (error) {
    console.error("Workman getMe error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contractor",
    });
  }
};