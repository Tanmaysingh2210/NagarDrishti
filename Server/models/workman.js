import mongoose from "mongoose";

const workmanSchema = new mongoose.Schema(
  {
    contractorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    contractorCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    profileImage: {
      type: String,
      default: null,
    },

    department: {
      type: String,
      required: true,
      enum: [
        "ROADS",
        "STREET_LIGHTING",
        "WATER_DRAINAGE",
        "WASTE_MANAGEMENT",
        "TREES_ENVIRONMENT",
        "PUBLIC_INFRASTRUCTURE",
        "STRAY_ANIMALS",
      ],
    },

    authorityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authority",
      required: true,
    },

    jurisdiction: {
      city: String,
      wards: [String],
      zones: [String],
    },

    teamSize: {
      type: Number,
      default: 1,
      min: 1,
    },

    assignedIssues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "WORKING",
        "ON_HOLD",
        "OFFLINE",
      ],
      default: "AVAILABLE",
    },

    statistics: {
      assignedProjects: {
        type: Number,
        default: 0,
      },

      completedProjects: {
        type: Number,
        default: 0,
      },

      activeProjects: {
        type: Number,
        default: 0,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

workmanSchema.index({
  authorityId: 1,
  department: 1,
});

workmanSchema.index({
  "jurisdiction.city": 1,
});

workmanSchema.index({
  contractorCode: 1,
});
workmanSchema.index({
  phone: 1,
  email: 1,
});

export default mongoose.model("Workman", workmanSchema);