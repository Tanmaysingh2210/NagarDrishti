import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issueNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    category: {
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
        "OTHERS",
      ],
    },

    subCategory: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    status: {
      type: String,
      enum: [
        "REPORTED",
        "AI_VERIFIED",
        "ACKNOWLEDGED",
        "ASSIGNED",
        "IN_PROGRESS",
        "RESOLVED",
        "REOPENED",
        "REJECTED",
        "ESCALATED",
      ],
      default: "REPORTED",
      index: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
      index: true,
    },

    priorityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },

      address: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      pincode: {
        type: String,
        trim: true,
      },

      ward: {
        type: String,
        trim: true,
      },

      zone: {
        type: String,
        trim: true,
      },
    },

    media: {
      photos: [
        {
          type: String,
          trim: true,
        },
      ],

      videos: [
        {
          type: String,
          trim: true,
        },
      ],

      audio: {
        type: String,
        trim: true,
      },
    },

    citizenEngagement: {
      upvotes: {
        type: Number,
        default: 0,
        min: 0,
      },

      supporters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Citizen",
        },
      ],

      comments: {
        type: Number,
        default: 0,
        min: 0,
      },

      credibilityWeightedVotes: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

issueSchema.index({
  location: "2dsphere",
});

export default mongoose.model("Issue", issueSchema);