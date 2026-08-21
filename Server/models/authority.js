import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
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

        role: {
            type: String,
            required: true,
            enum: [
                "CITY_ADMIN",
                "DEPARTMENT_HEAD",
                "FIELD_OFFICER",
            ],
        },

        jurisdiction: {
            city: {
                type: String,
                trim: true,
            },

            zones: [
                {
                    type: String,
                    trim: true,
                },
            ],

            wards: [
                {
                    type: String,
                    trim: true,
                },
            ],

            pincodeRanges: [
                {
                    type: String,
                    trim: true,
                },
            ],
        },

        assignedIssues: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Issue",
            },
        ],

        permissions: {
            viewIssues: {
                type: Boolean,
                default: false,
            },

            assignIssues: {
                type: Boolean,
                default: false,
            },

            updateIssues: {
                type: Boolean,
                default: false,
            },

            resolveIssues: {
                type: Boolean,
                default: false,
            },

            manageCitizens: {
                type: Boolean,
                default: false,
            },

            viewAnalytics: {
                type: Boolean,
                default: false,
            },

            manageUsers: {
                type: Boolean,
                default: false,
            },
        },

        statistics: {
            issuesHandled: {
                type: Number,
                default: 0,
                min: 0,
            },

            issuesResolved: {
                type: Number,
                default: 0,
                min: 0,
            },

            issuesEscalated: {
                type: Number,
                default: 0,
                min: 0,
            },

            averageResolutionTime: {
                type: Number,
                default: 0,
                min: 0,
            },

            currentWorkload: {
                type: Number,
                default: 0,
                min: 0,
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


// Useful indexes

authoritySchema.index({
    role: 1,
    isActive: 1,
});

authoritySchema.index({
    "jurisdiction.city": 1,
});

authoritySchema.index({
    "jurisdiction.wards": 1,
});


export default mongoose.model("Authority", authoritySchema);