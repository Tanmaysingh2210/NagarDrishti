import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        aadhar: {
            type: String,
            unique: true,
            sparse: true,
            select: false,
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
            lowercase: true,
            trim: true,
            unique: true,
            sparse: true,
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

        location: {
            type: {
                type: String,
                enum: ["Point"],
                // default: "Point",
            },

            coordinates: {
                type: [Number],
                default: undefined,
            },
        },

        address: {
            addressLine: {
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
        },

        credibilityScore: {
            type: Number,
            default: 100,
            min: 0,
        },

        statistics: {
            totalReports: {
                type: Number,
                default: 0,
                min: 0,
            },

            verifiedReports: {
                type: Number,
                default: 0,
                min: 0,
            },

            resolvedReports: {
                type: Number,
                default: 0,
                min: 0,
            },

            rejectedReports: {
                type: Number,
                default: 0,
                min: 0,
            },

            issuesSupported: {
                type: Number,
                default: 0,
                min: 0,
            },
        },

        preferences: {
            notifications: {
                type: Boolean,
                default: true,
            },

            locationServices: {
                type: Boolean,
                default: true,
            },

            language: {
                type: String,
                default: "en",
                trim: true,
            },
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

citizenSchema.index({
    location: "2dsphere",
});

export default mongoose.model("Citizen", citizenSchema);