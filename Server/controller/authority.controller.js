import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getPermissionsForRole } from "../config/authorityPermissions.js";
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

export const createAuthority = async (req, res) => {
    try {
        const {
            name,
            employeeId,
            phone,
            email,
            password,
            profileImage,
            role,
            jurisdiction,
        } = req.body;

        if (
            !name ||
            !employeeId ||
            !phone ||
            !email ||
            !password ||
            !role
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, employee ID, phone, email, password and role are required",
            });
        }

        const permissions =
            getPermissionsForRole(role);

        if (!permissions) {
            return res.status(400).json({
                success: false,
                message: "Invalid authority role",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 8 characters",
            });
        }

        const normalizedEmployeeId =
            employeeId.trim().toUpperCase();

        const normalizedEmail =
            email.trim().toLowerCase();

        const normalizedPhone =
            phone.replace(/\D/g, "");

        const existingEmployee =
            await Authority.findOne({
                employeeId: normalizedEmployeeId,
            });

        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Employee ID already registered",
            });
        }

        const existingEmail =
            await Authority.findOne({
                email: normalizedEmail,
            });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }

        const existingPhone =
            await Authority.findOne({
                phone: normalizedPhone,
            });

        if (existingPhone) {
            return res.status(409).json({
                success: false,
                message: "Phone number already registered",
            });
        }

        const passwordHash =
            await bcrypt.hash(password, 12);

        const authority =
            await Authority.create({
                name: name.trim(),
                employeeId:
                    normalizedEmployeeId,
                phone:
                    normalizedPhone,
                email:
                    normalizedEmail,
                passwordHash,
                profileImage:
                    profileImage || null,
                role,
                jurisdiction:
                    jurisdiction || {},
                permissions,
                isActive: true,
            });

        return res.status(201).json({
            success: true,
            message:
                "Authority created successfully",

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
                isActive: authority.isActive,
                createdAt: authority.createdAt,
            },
        });

    } catch (error) {
        console.error(
            "Create authority error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create authority",
        });
    }
};

export const getAllAuthorities = async (req, res) => {
    try {
        const authorities = await Authority.find()
            .select("-passwordHash")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            count: authorities.length,
            authorities,
        });

    } catch (error) {
        console.error(
            "Get authorities error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch authorities",
        });
    }
};

export const getAuthorityById = async (req, res) => {
    try {
        const { id } = req.params;

        const authority =
            await Authority.findById(id)
                .select("-passwordHash");

        if (!authority) {
            return res.status(404).json({
                success: false,
                message: "Authority not found",
            });
        }

        return res.status(200).json({
            success: true,
            authority,
        });

    } catch (error) {
        console.error(
            "Get authority by ID error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch authority",
        });
    }
};

export const updateAuthority = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = [
            "name",
            "phone",
            "email",
            "profileImage",
            "role",
            "jurisdiction",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        // If role changes, recalculate permissions
        if (updates.role) {
            const permissions =
                getPermissionsForRole(
                    updates.role
                );

            if (!permissions) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid authority role",
                });
            }

            updates.permissions =
                permissions;
        }

        const authority =
            await Authority.findByIdAndUpdate(
                id,
                {
                    $set: updates,
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).select("-passwordHash");

        if (!authority) {
            return res.status(404).json({
                success: false,
                message: "Authority not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Authority updated successfully",
            authority,
        });

    } catch (error) {
        console.error(
            "Update authority error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update authority",
        });
    }
};

export const toggleAuthorityStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const authority =
            await Authority.findById(id);

        if (!authority) {
            return res.status(404).json({
                success: false,
                message: "Authority not found",
            });
        }

        authority.isActive =
            !authority.isActive;

        await authority.save();

        return res.status(200).json({
            success: true,
            message: authority.isActive
                ? "Authority activated successfully"
                : "Authority deactivated successfully",

            authority: {
                id: authority._id,
                name: authority.name,
                employeeId: authority.employeeId,
                role: authority.role,
                isActive: authority.isActive,
            },
        });

    } catch (error) {
        console.error(
            "Toggle authority status error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update authority status",
        });
    }
};