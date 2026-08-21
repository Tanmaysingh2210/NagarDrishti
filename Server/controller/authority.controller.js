import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Authority from "../models/authority.js";


// =========================
// Generate JWT
// =========================

const generateToken = (authorityId) => {
    return jwt.sign(
        {
            userId: authorityId,
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
    res.cookie("authorityToken", token, {
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
                message: "Employee ID/email and password are required",
            });
        }

        const normalizedIdentifier =
            identifier.toLowerCase().trim();

        const normalizedEmployeeId =
            identifier.trim().toUpperCase();

        // Find using employee ID or email
        const authority = await Authority.findOne({
            $or: [
                {
                    employeeId: normalizedEmployeeId,
                },
                {
                    email: normalizedIdentifier,
                },
            ],
        }).select("+passwordHash");

        if (!authority) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Check account status
        if (!authority.isActive) {
            return res.status(403).json({
                success: false,
                message: "Authority account is inactive",
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            authority.passwordHash
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Update last login
        authority.lastLogin = new Date();

        await authority.save();

        // Generate JWT
        const token = generateToken(authority._id);

        // Set cookie
        setAuthCookie(res, token);

        res.status(200).json({
            success: true,
            message: "Login successful",

            authority: {
                id: authority._id,
                name: authority.name,
                employeeId: authority.employeeId,
                phone: authority.phone,
                email: authority.email,
                profileImage: authority.profileImage,
                role: authority.role,
                jurisdiction: authority.jurisdiction,
                permissions: authority.permissions,
                statistics: authority.statistics,
                isActive: authority.isActive,
                lastLogin: authority.lastLogin,
            },
        });

    } catch (error) {
        console.error("Authority login error:", error);

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
        res.clearCookie("authorityToken", {
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
        console.error("Authority logout error:", error);

        res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};


// =========================
// GET CURRENT AUTHORITY
// =========================

export const getMe = async (req, res) => {
    try {
        const authority = await Authority.findById(
            req.user._id
        );

        if (!authority) {
            return res.status(404).json({
                success: false,
                message: "Authority not found",
            });
        }

        res.status(200).json({
            success: true,
            authority,
        });

    } catch (error) {
        console.error("Get authority error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch current authority",
        });
    }
};