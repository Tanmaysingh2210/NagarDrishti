import jwt from "jsonwebtoken";
import Citizen from "../models/citizen.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    const citizen = await Citizen.findById(decoded.userId);

    if (!citizen) {
      return res.status(401).json({
        success: false,
        message: "Citizen account not found",
      });
    }

    if (!citizen.isActive) {
      return res.status(403).json({
        success: false,
        message: "Citizen account is inactive",
      });
    }

    req.user = citizen;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Authentication token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};