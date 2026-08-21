import mongoose from "mongoose";

import Issue from "../models/issue.js";


// =========================
// Allowed Values
// =========================

const ALLOWED_STATUSES = [
    "REPORTED",
    "AI_VERIFIED",
    "ACKNOWLEDGED",
    "ASSIGNED",
    "IN_PROGRESS",
    "RESOLVED",
    "REOPENED",
    "REJECTED",
    "ESCALATED",
];

const ALLOWED_CATEGORIES = [
    "ROADS",
    "STREET_LIGHTING",
    "WATER_DRAINAGE",
    "WASTE_MANAGEMENT",
    "TREES_ENVIRONMENT",
    "PUBLIC_INFRASTRUCTURE",
    "STRAY_ANIMALS",
    "OTHERS",
];

const ALLOWED_PRIORITIES = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
];


// =========================
// Build Jurisdiction Filter
// =========================

const buildJurisdictionFilter = (authority) => {
    const jurisdiction = authority.jurisdiction || {};

    const filter = {};

    // =========================
    // City
    // =========================

    if (jurisdiction.city) {
        filter["location.city"] =
            jurisdiction.city;
    }

    // =========================
    // Wards
    // =========================

    if (jurisdiction.wards?.length) {
        filter["location.ward"] = {
            $in: jurisdiction.wards,
        };
    }

    // =========================
    // Zones
    // =========================

    if (jurisdiction.zones?.length) {
        filter["location.zone"] = {
            $in: jurisdiction.zones,
        };
    }

    // =========================
    // Pincode Ranges
    // =========================

    if (jurisdiction.pincodeRanges?.length) {
        filter["location.pincode"] = {
            $in: jurisdiction.pincodeRanges,
        };
    }

    return filter;
};


// =========================
// Check Issue Jurisdiction
// =========================

const isIssueWithinJurisdiction = (
    issue,
    authority
) => {
    const jurisdiction =
        authority.jurisdiction || {};

    // =========================
    // City
    // =========================

    if (
        jurisdiction.city &&
        issue.location?.city !==
            jurisdiction.city
    ) {
        return false;
    }

    // =========================
    // Ward
    // =========================

    if (
        jurisdiction.wards?.length &&
        !jurisdiction.wards.includes(
            issue.location?.ward
        )
    ) {
        return false;
    }

    // =========================
    // Zone
    // =========================

    if (
        jurisdiction.zones?.length &&
        !jurisdiction.zones.includes(
            issue.location?.zone
        )
    ) {
        return false;
    }

    // =========================
    // Pincode
    // =========================

    if (
        jurisdiction.pincodeRanges?.length &&
        !jurisdiction.pincodeRanges.includes(
            issue.location?.pincode
        )
    ) {
        return false;
    }

    return true;
};


// =========================
// GET AUTHORITY ISSUES
// =========================
// GET /api/authority/issues
// =========================

export const getAuthorityIssues = async (
    req,
    res
) => {
    try {
        const authority = req.user;

        const {
            status,
            category,
            priority,
            ward,
            zone,
            page = 1,
            limit = 20,
        } = req.query;


        // =========================
        // Validate Jurisdiction
        // =========================

        const jurisdiction =
            authority.jurisdiction || {};

        if (!jurisdiction.city) {
            return res.status(403).json({
                success: false,
                message:
                    "Authority jurisdiction is not configured",
            });
        }


        // =========================
        // Validate Pagination
        // =========================

        const pageNumber = Math.max(
            Number(page) || 1,
            1
        );

        const limitNumber = Math.min(
            Math.max(Number(limit) || 20, 1),
            100
        );

        const skip =
            (pageNumber - 1) *
            limitNumber;


        // =========================
        // Base Jurisdiction Filter
        // =========================

        const filter =
            buildJurisdictionFilter(
                authority
            );


        // =========================
        // Status Filter
        // =========================

        if (status) {
            if (
                !ALLOWED_STATUSES.includes(
                    status
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid issue status",
                });
            }

            filter.status = status;
        }


        // =========================
        // Category Filter
        // =========================

        if (category) {
            if (
                !ALLOWED_CATEGORIES.includes(
                    category
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid issue category",
                });
            }

            filter.category = category;
        }


        // =========================
        // Priority Filter
        // =========================

        if (priority) {
            if (
                !ALLOWED_PRIORITIES.includes(
                    priority
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid issue priority",
                });
            }

            filter.priority = priority;
        }


        // =========================
        // Ward Filter
        // =========================

        if (ward) {
            // Prevent authority from querying
            // a ward outside its jurisdiction

            if (
                jurisdiction.wards?.length &&
                !jurisdiction.wards.includes(
                    ward
                )
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        "Ward is outside your jurisdiction",
                });
            }

            filter["location.ward"] = ward;
        }


        // =========================
        // Zone Filter
        // =========================

        if (zone) {
            // Prevent authority from querying
            // a zone outside its jurisdiction

            if (
                jurisdiction.zones?.length &&
                !jurisdiction.zones.includes(
                    zone
                )
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        "Zone is outside your jurisdiction",
                });
            }

            filter["location.zone"] = zone;
        }


        // =========================
        // Query Issues
        // =========================

        const [issues, total] =
            await Promise.all([
                Issue.find(filter)
                    .populate(
                        "citizenId",
                        "name profileImage credibilityScore"
                    )
                    .populate(
                        "assignment.authorityId",
                        "name employeeId role"
                    )
                    .populate(
                        "resolution.resolvedBy",
                        "name employeeId role"
                    )
                    .sort({
                        createdAt: -1,
                    })
                    .skip(skip)
                    .limit(limitNumber),

                Issue.countDocuments(filter),
            ]);


        // =========================
        // Response
        // =========================

        return res.status(200).json({
            success: true,

            count: issues.length,

            total,

            page: pageNumber,

            pages: Math.ceil(
                total / limitNumber
            ),

            issues,
        });

    } catch (error) {
        console.error(
            "getAuthorityIssues error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch authority issues",
        });
    }
};


// =========================
// GET AUTHORITY ISSUE BY ID
// =========================
// GET /api/authority/issues/:issueId
// =========================

export const getAuthorityIssueById = async (
    req,
    res
) => {
    try {
        const { issueId } =
            req.params;


        // =========================
        // Validate Issue ID
        // =========================

        if (
            !mongoose.Types.ObjectId.isValid(
                issueId
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid issue ID",
            });
        }


        // =========================
        // Find Issue
        // =========================

        const issue =
            await Issue.findById(
                issueId
            )
                .populate(
                    "citizenId",
                    "name profileImage credibilityScore"
                )
                .populate(
                    "assignment.authorityId",
                    "name employeeId role"
                )
                .populate(
                    "resolution.resolvedBy",
                    "name employeeId role"
                );


        // =========================
        // Issue Not Found
        // =========================

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            });
        }


        // =========================
        // Jurisdiction Check
        // =========================

        const authority =
            req.user;

        const isAuthorized =
            isIssueWithinJurisdiction(
                issue,
                authority
            );

        if (!isAuthorized) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to access this issue",
            });
        }


        // =========================
        // Response
        // =========================

        return res.status(200).json({
            success: true,
            issue,
        });

    } catch (error) {
        console.error(
            "getAuthorityIssueById error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch issue",
        });
    }
};