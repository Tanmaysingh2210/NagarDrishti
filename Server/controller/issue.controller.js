import mongoose from "mongoose";
import Issue from "../models/issue.js";
import IssueUpvote from "../models/issueUpvote.js";
import Citizen from "../models/citizen.js";
import counter from "../models/counter.js";


// Generate issue number
const generateIssueNumber = async () => {
    const year = new Date().getFullYear();

    // const lastIssue = await Issue.findOne({
    //     issueNumber: new RegExp(`^CIV-${year}-`),
    // })
    //     .sort({ createdAt: -1 })
    //     .select("issueNumber");

    // let nextNumber = 1;

    // if (lastIssue) {
    //     const parts = lastIssue.issueNumber.split("-");
    //     nextNumber = Number(parts[2]) + 1;
    // }
    const counter = await counter.findOneAndUpdate(
        { name: `issue-${year}` },
        { $inc: { seq: 1 } },
        {
            new: true,
            upsert: true,
            
        }
    );

    return `CIV-${year}-${String(counter.seq).padStart(4, "0")}`;
};


// CREATE ISSUE
export const createIssue = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            subCategory,
            location,
            media,
        } = req.body;

        // Basic validation
        if (!title || !description || !category || !location) {
            return res.status(400).json({
                success: false,
                message: "Title, description, category and location are required",
            });
        }

        // Validate location
        if (
            !Array.isArray(location.coordinates) ||
            location.coordinates.length !== 2
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Location coordinates must be [longitude, latitude]",
            });
        }

        const [longitude, latitude] = location.coordinates;

        if (
            longitude < -180 ||
            longitude > 180 ||
            latitude < -90 ||
            latitude > 90
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid location coordinates",
            });
        }

        const issueNumber = await generateIssueNumber();

        const issue = await Issue.create({
            issueNumber,
            citizenId: req.user._id,
            title,
            description,
            category,
            subCategory,

            location: {
                type: "Point",
                coordinates: [longitude, latitude],
                address: location.address,
                city: location.city,
                state: location.state,
                pincode: location.pincode,
                ward: location.ward,
                zone: location.zone,
            },

            media: {
                photos: media?.photos || [],
                videos: media?.videos || [],
                audio: media?.audio || null,
            },

            status: "REPORTED",
            priority: "MEDIUM",
        });

        await Citizen.findByIdAndUpdate(
            req.user._id,
            {
                $inc: {
                    "statistics.totalReports": 1,
                },
            }
        );

        res.status(201).json({
            success: true,
            message: "Issue reported successfully",
            issue,
        });
    } catch (error) {
        console.error("createIssue error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create issue",
        });
    }
};


// GET MY ISSUES
export const getMyIssues = async (req, res) => {
    try {
        const issues = await Issue.find({
            citizenId: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: issues.length,
            issues,
        });
    } catch (error) {
        console.error("getMyIssues error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch your issues",
        });
    }
};


// GET ISSUE BY ID
export const getIssueById = async (req, res) => {
    try {
        const { issueId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(issueId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid issue ID",
            });
        }

        const issue = await Issue.findById(issueId)
            .populate("citizenId", "name profileImage credibilityScore")
            .populate(
                "citizenEngagement.supporters",
                "name profileImage credibilityScore"
            );

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            });
        }

        res.status(200).json({
            success: true,
            issue,
        });
    } catch (error) {
        console.error("getIssueById error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch issue",
        });
    }
};


// GET NEARBY ISSUES
export const getNearbyIssues = async (req, res) => {
    try {
        const {
            longitude,
            latitude,
            radius = 5000,
        } = req.query;

        const lng = Number(longitude);
        const lat = Number(latitude);
        const distance = Number(radius);

        if (
            Number.isNaN(lng) ||
            Number.isNaN(lat) ||
            Number.isNaN(distance)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "longitude, latitude and radius must be valid numbers",
            });
        }

        if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
            return res.status(400).json({
                success: false,
                message: "Invalid longitude or latitude",
            });
        }

        if (distance <= 0 || distance > 50000) {
            return res.status(400).json({
                success: false,
                message: "Radius must be between 1 and 50000 meters",
            });
        }

        const issues = await Issue.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat],
                    },
                    $maxDistance: distance,
                },
            },
            status: {
                $nin: ["REJECTED"],
            },
        })
            .limit(100)
            .populate("citizenId", "name profileImage credibilityScore");

        res.status(200).json({
            success: true,
            count: issues.length,
            issues,
        });
    } catch (error) {
        console.error("getNearbyIssues error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch nearby issues",
        });
    }
};


// UPVOTE ISSUE
export const upvoteIssue = async (req, res) => {
    try {
        const { issueId } = req.params;
        const citizenId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(issueId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid issue ID",
            });
        }

        const issue = await Issue.findById(issueId);

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            });
        }

        // Prevent citizen from upvoting their own issue
        if (issue.citizenId.toString() === citizenId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot upvote your own issue",
            });
        }

        // Check whether already upvoted
        const existingUpvote = await IssueUpvote.findOne({
            issueId,
            citizenId,
        });

        if (existingUpvote) {
            return res.status(400).json({
                success: false,
                message: "You have already upvoted this issue",
            });
        }

        // Create upvote record
        await IssueUpvote.create({
            issueId,
            citizenId,
        });

        // Update issue aggregate
        await Issue.findByIdAndUpdate(issueId, {
            $inc: {
                "citizenEngagement.upvotes": 1,
            },
            $addToSet: {
                "citizenEngagement.supporters": citizenId,
            },
        });

        // Update citizen statistic
        await Citizen.findByIdAndUpdate(citizenId, {
            $inc: {
                "statistics.issuesSupported": 1,
            },
        });

        const updatedIssue = await Issue.findById(issueId);

        return res.status(200).json({
            success: true,
            message: "Issue upvoted successfully",
            upvotes: updatedIssue.citizenEngagement.upvotes,
        });
    } catch (error) {
        console.error("upvoteIssue error:", error);

        // Handles race-condition duplicate inserts
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You have already upvoted this issue",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to upvote issue",
        });
    }
};


// REMOVE UPVOTE
export const removeUpvote = async (req, res) => {
    try {
        const { issueId } = req.params;
        const citizenId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(issueId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid issue ID",
            });
        }

        const upvote = await IssueUpvote.findOneAndDelete({
            issueId,
            citizenId,
        });

        if (!upvote) {
            return res.status(400).json({
                success: false,
                message: "You have not upvoted this issue",
            });
        }

        await Issue.findByIdAndUpdate(issueId, {
            $inc: {
                "citizenEngagement.upvotes": -1,
            },
            $pull: {
                "citizenEngagement.supporters": citizenId,
            },
        });

        await Citizen.findByIdAndUpdate(citizenId, {
            $inc: {
                "statistics.issuesSupported": -1,
            },
        });

        const updatedIssue = await Issue.findById(issueId);

        res.status(200).json({
            success: true,
            message: "Upvote removed successfully",
            upvotes: updatedIssue.citizenEngagement.upvotes,
        });
    } catch (error) {
        console.error("removeUpvote error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove upvote",
        });
    }
};