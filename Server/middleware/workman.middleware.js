import jwt from "jsonwebtoken";
import Workman from "../models/workman.js";

// =========================
// REQUIRE WORKMAN AUTH
// =========================

export const requireWorkman = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    const workman = await Workman.findById(decoded.userId);

    if (!workman) {
      return res.status(401).json({
        success: false,
        message: "Contractor not found",
      });
    }

    if (!workman.isActive) {
      return res.status(403).json({
        success: false,
        message: "Contractor account is inactive",
      });
    }

    req.user = workman;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};