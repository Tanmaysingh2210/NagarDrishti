import bcrypt from "bcryptjs";
import Workman from "../models/workman.js";

// =========================
// CREATE CONTRACTOR
// POST /api/authority/workmen
// =========================

export const createWorkman = async (req, res) => {
  try {
    const authority = req.user;

    const {
      contractorName,
      contractorCode,
      ownerName,
      phone,
      email,
      password,
      department,
      teamSize,
      profileImage,
    } = req.body;

    // =========================
    // Validation
    // =========================

    if (
      !contractorName ||
      !contractorCode ||
      !ownerName ||
      !phone ||
      !password ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Contractor name, contractor code, owner name, phone, password and department are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    // =========================
    // Normalize Data
    // =========================

    const normalizedPhone = phone.replace(/\D/g, "");
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedCode = contractorCode.trim().toUpperCase();

    // =========================
    // Duplicate Checks
    // =========================

    const existingCode = await Workman.findOne({
      contractorCode: normalizedCode,
    });

    if (existingCode) {
      return res.status(409).json({
        success: false,
        message: "Contractor code already registered",
      });
    }

    const existingPhone = await Workman.findOne({
      phone: normalizedPhone,
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number already registered",
      });
    }

    if (normalizedEmail) {
      const existingEmail = await Workman.findOne({
        email: normalizedEmail,
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }
    }

    // =========================
    // Hash Password
    // =========================

    const passwordHash = await bcrypt.hash(password, 12);

    // =========================
    // Create Contractor
    // =========================

    const workman = await Workman.create({
      contractorName: contractorName.trim(),
      contractorCode: normalizedCode,
      ownerName: ownerName.trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      passwordHash,
      profileImage: profileImage || null,
      department,
      teamSize: teamSize || 1,

      authorityId: authority._id,

      jurisdiction: {
        city: authority.jurisdiction.city,
        wards: authority.jurisdiction.wards,
        zones: authority.jurisdiction.zones,
      },

      isActive: true,
    });

    // =========================
    // Response
    // =========================

    return res.status(201).json({
      success: true,
      message: "Contractor created successfully",

      workman: {
        id: workman._id,
        contractorName: workman.contractorName,
        contractorCode: workman.contractorCode,
        ownerName: workman.ownerName,
        phone: workman.phone,
        email: workman.email,
        department: workman.department,
        teamSize: workman.teamSize,
        status: workman.status,
        jurisdiction: workman.jurisdiction,
        isActive: workman.isActive,
        createdAt: workman.createdAt,
      },
    });
  } catch (error) {
    console.error("Create contractor error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create contractor",
    });
  }
};

// =========================
// GET ALL CONTRACTORS
// GET /api/authority/workmen
// =========================

export const getAllWorkmen = async (req, res) => {
  try {
    const authority = req.user;

    const workmen = await Workman.find({
      authorityId: authority._id,
    })
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: workmen.length,
      workmen,
    });
  } catch (error) {
    console.error("Get contractors error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contractors",
    });
  }
};


export const getWorkmanById = async (req, res) => {
  try {
    const authority = req.user;
    const { id } = req.params;

    // =========================
    // Validate ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contractor ID",
      });
    }

    // =========================
    // Find Contractor
    // =========================

    const workman = await Workman.findById(id).select("-passwordHash");

    if (!workman) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    // =========================
    // Ownership Check
    // =========================

    if (!workman.authorityId.equals(authority._id)) {
      return res.status(403).json({
        success: false,
        message: "Contractor is outside your authority",
      });
    }

    // =========================
    // Response
    // =========================

    return res.status(200).json({
      success: true,
      workman,
    });

  } catch (error) {
    console.error("Get contractor by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contractor",
    });
  }
};

// =========================
// UPDATE CONTRACTOR
// PATCH /api/authority/workmen/:id
// =========================

export const updateWorkman = async (req, res) => {
  try {
    const authority = req.user;
    const { id } = req.params;

    // =========================
    // Validate ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contractor ID",
      });
    }

    // =========================
    // Find Contractor
    // =========================

    const workman = await Workman.findById(id);

    if (!workman) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    // =========================
    // Ownership Check
    // =========================

    if (!workman.authorityId.equals(authority._id)) {
      return res.status(403).json({
        success: false,
        message: "Contractor is outside your authority",
      });
    }

    // =========================
    // Allowed Fields
    // =========================

    const allowedFields = [
      "contractorName",
      "ownerName",
      "phone",
      "email",
      "department",
      "teamSize",
      "profileImage",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // =========================
    // Normalize Data
    // =========================

    if (updates.phone) {
      updates.phone = updates.phone.replace(/\D/g, "");
    }

    if (updates.email) {
      updates.email = updates.email.trim().toLowerCase();
    }

    if (updates.contractorName) {
      updates.contractorName = updates.contractorName.trim();
    }

    if (updates.ownerName) {
      updates.ownerName = updates.ownerName.trim();
    }

    // =========================
    // Duplicate Checks
    // =========================

    if (updates.phone) {
      const existingPhone = await Workman.findOne({
        phone: updates.phone,
        _id: { $ne: id },
      });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    if (updates.email) {
      const existingEmail = await Workman.findOne({
        email: updates.email,
        _id: { $ne: id },
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }
    }

    // =========================
    // Update Contractor
    // =========================

    const updatedWorkman = await Workman.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select("-passwordHash");

    // =========================
    // Response
    // =========================

    return res.status(200).json({
      success: true,
      message: "Contractor updated successfully",
      workman: updatedWorkman,
    });

  } catch (error) {
    console.error("Update contractor error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contractor",
    });
  }
};

// =========================
// TOGGLE CONTRACTOR STATUS
// PATCH /api/authority/workmen/:id/status
// =========================

export const toggleWorkmanStatus = async (req, res) => {
  try {
    const authority = req.user;
    const { id } = req.params;

    // =========================
    // Validate ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contractor ID",
      });
    }

    // =========================
    // Find Contractor
    // =========================

    const workman = await Workman.findById(id);

    if (!workman) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    // =========================
    // Ownership Check
    // =========================

    if (!workman.authorityId.equals(authority._id)) {
      return res.status(403).json({
        success: false,
        message: "Contractor is outside your authority",
      });
    }

    // =========================
    // Toggle Status
    // =========================

    workman.isActive = !workman.isActive;

    if (!workman.isActive) {
      workman.status = "OFFLINE";
    } else if (workman.status === "OFFLINE") {
      workman.status = "AVAILABLE";
    }

    await workman.save();

    // =========================
    // Response
    // =========================

    return res.status(200).json({
      success: true,
      message: workman.isActive
        ? "Contractor activated successfully"
        : "Contractor deactivated successfully",

      workman: {
        id: workman._id,
        contractorName: workman.contractorName,
        contractorCode: workman.contractorCode,
        status: workman.status,
        isActive: workman.isActive,
      },
    });

  } catch (error) {
    console.error("Toggle contractor status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contractor status",
    });
  }
};