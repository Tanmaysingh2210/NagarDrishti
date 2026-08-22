import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Citizen from "../models/citizen.js";


// =========================
// Generate JWT
// =========================

const generateToken = (citizenId) => {
  return jwt.sign(
    {
      userId: citizenId,
    },
    process.env.SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// =========================
// Set Authentication Cookie
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
// REGISTER
// =========================

export const register = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      aadhar,
    } = req.body;

    const normalizedPhone = phone?.replace(/\D/g, "");
     const normalizedAadhar = aadhar?.replace(/\D/g, "");
    const normalizedEmail = email?.trim().toLowerCase();

    // Validate required fields
    if (!name || !normalizedPhone || !password || !normalizedAadhar) {
      return res.status(400).json({
        success: false,
        message: "Name, phone , aadhar and password are required",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    // =========================
    // AADHAAR VALIDATION
    // =========================

    if (normalizedAadhar.length !== 12) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar number must contain 12 digits",
      });
    }

    // Check existing phone
    const existingPhone = await Citizen.findOne({
      phone: normalizedPhone,
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number already registered",
      });
    }

     // =========================
    // CHECK AADHAAR
    // =========================

    const existingAadhar = await Citizen.findOne({
      aadhar: normalizedAadhar,
    });

    if (existingAadhar) {
      return res.status(409).json({
        success: false,
        message: "Aadhaar number already registered",
      });
    }

    // Check existing email
    if (email) {
      const existingEmail = await Citizen.findOne({
        email: email.toLowerCase(),
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create citizen
    const citizen = await Citizen.create({
      name,
      phone: normalizedPhone,
      aadhar: normalizedAadhar,
      email: email?.toLowerCase(),
      passwordHash,
    });

    // Generate JWT
    const token = generateToken(citizen._id);

    // Set cookie
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Citizen registered successfully",

      token,

      citizen: {
        id: citizen._id,
        name: citizen.name,
        phone: citizen.phone,
        email: citizen.email,
        isVerified: citizen.isVerified,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};


// =========================
// LOGIN
// =========================

export const login = async (req, res) => {
  try {
    const {
      identifier,
      password,
    } = req.body;




    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone/email and password are required",
      });
    }

    const normalizedIdentifier = identifier.toLowerCase();
    const normalizedPhone = identifier.replace(/\D/g, "");

    // Find using either phone or email
    const citizen = await Citizen.findOne({
      $or: [
        { phone: normalizedPhone },
        { email: normalizedIdentifier },
      ],
    }).select("+passwordHash");

    if (!citizen) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check account status
    if (!citizen.isActive) {
      return res.status(403).json({
        success: false,
        message: "Citizen account is inactive",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      citizen.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(citizen._id);

    // Set cookie
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      citizen: {
        id: citizen._id,
        name: citizen.name,
        phone: citizen.phone,
        email: citizen.email,
        profileImage: citizen.profileImage,
        credibilityScore: citizen.credibilityScore,
        isVerified: citizen.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};


// =========================
// LOGOUT
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

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};


// =========================
// GET CURRENT CITIZEN
// =========================

export const getMe = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.user._id);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen not found",
      });
    }

    res.status(200).json({
      success: true,
      citizen,
    });
  } catch (error) {
    console.error("Get me error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch current citizen",
    });
  }
};  