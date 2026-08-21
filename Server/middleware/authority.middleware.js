import jwt from "jsonwebtoken";

import Authority from "../models/authority.js";


export const requireAuthority = async (req, res, next) => {
    try {
        const token = req.cookies.authorityToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.SECRET
        );

        // Find authority
        const authority = await Authority.findById(
            decoded.userId
        );

        if (!authority) {
            return res.status(401).json({
                success: false,
                message: "Authority not found",
            });
        }

        // Check account status
        if (!authority.isActive) {
            return res.status(403).json({
                success: false,
                message: "Authority account is inactive",
            });
        }

        // Attach authority to request
        req.user = authority;

        next();

    } catch (error) {
        console.error(
            "Authority authentication error:",
            error
        );

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token",
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Authentication token expired",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
        });
    }
};



export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action",
            });
        }

        next();
    };
};


export const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        if (!req.user.permissions?.[permission]) {
            return res.status(403).json({
                success: false,
                message: "You do not have the required permission",
            });
        }

        next();
    };
};