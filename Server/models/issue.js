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

        severityScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
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

        routing: {

            departmentName: {
                type: String,
                trim: true,
                default: null,
            },

            routingMethod: {
                type: String,
                enum: [
                    "MANUAL",
                    "AI",
                    "CATEGORY",
                    "LOCATION",
                ],
                default: null,
            },

            aiConfidence: {
                type: Number,
                min: 0,
                max: 1,
                default: null,
            },

            routedAt: {
                type: Date,
                default: null,
            },
        },

        assignment: {
            authorityId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Authority",
                default: null,
                index: true,
            },
            workmanId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Workman",
                default: null,
                index: true,
            },

            assignedAt: {
                type: Date,
                default: null,
            },

            deadline: {
                type: Date,
                default: null,
            },

            priority: {
                type: String,
                enum: [
                    "LOW",
                    "MEDIUM",
                    "HIGH",
                    "CRITICAL",
                ],
                default: null,
            },
        },

        timeline: [
            {
                event: {
                    type: String,
                    required: true,
                    trim: true,
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
                },

                performedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: null,
                },

                performedByType: {
                    type: String,
                    enum: [
                        "CITIZEN",
                        "AUTHORITY",
                        "WORKMAN",
                        "SYSTEM",
                    ],
                },

                note: {
                    type: String,
                    trim: true,
                    maxlength: 1000,
                },

                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        resolution: {
            description: {
                type: String,
                trim: true,
                maxlength: 2000,
                default: null,
            },

            beforeMedia: [
                {
                    type: String,
                    trim: true,
                },
            ],

            afterMedia: [
                {
                    type: String,
                    trim: true,
                },
            ],

            resolvedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Authority",
                default: null,
            },

            resolvedAt: {
                type: Date,
                default: null,
            },

            citizenVerified: {
                type: Boolean,
                default: false,
            },

            citizenVerifiedAt: {
                type: Date,
                default: null,
            },

            citizenFeedback: {
                type: String,
                trim: true,
                maxlength: 1000,
                default: null,
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

issueSchema.index({
    "location.city": 1,
    "location.ward": 1,
    status: 1,
});

issueSchema.index({
    "assignment.authorityId": 1,
    status: 1,
});

issueSchema.index({
    priority: 1,
    status: 1,
});

export default mongoose.model("Issue", issueSchema);