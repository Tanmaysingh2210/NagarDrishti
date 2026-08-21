import Citizen from "../models/citizen.js";

/**
 * GET /api/citizens/me
 * Get currently logged-in citizen profile
 */
export const getMyProfile = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.user._id);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen profile not found",
      });
    }

    res.status(200).json({
      success: true,
      citizen,
    });
  } catch (error) {
    console.error("getMyProfile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch citizen profile",
    });
  }
};


/**
 * PATCH /api/citizens/me
 * Update currently logged-in citizen profile
 */
export const updateMyProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "email",
      "profileImage",
      "location",
      "address",
      "preferences",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const citizen = await Citizen.findByIdAndUpdate(
      req.user._id,
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      citizen,
    });
  } catch (error) {
    console.error("updateMyProfile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update citizen profile",
    });
  }
};


/**
 * PATCH /api/citizens/me/location
 * Update citizen's current location
 */
export const updateMyLocation = async (req, res) => {
  try {
    const { coordinates } = req.body;

    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      typeof coordinates[0] !== "number" ||
      typeof coordinates[1] !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "coordinates must be an array containing [longitude, latitude]",
      });
    }

    const [longitude, latitude] = coordinates;

    if (
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid longitude or latitude",
      });
    }

    const citizen = await Citizen.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      location: citizen.location,
    });
  } catch (error) {
    console.error("updateMyLocation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update location",
    });
  }
};


/**
 * PATCH /api/citizens/me/preferences
 * Update citizen preferences
 */
export const updateMyPreferences = async (req, res) => {
  try {
    const allowedPreferences = [
      "notifications",
      "locationServices",
      "language",
    ];

    const preferences = {};

    for (const field of allowedPreferences) {
      if (req.body[field] !== undefined) {
        preferences[field] = req.body[field];
      }
    }

    const citizen = await Citizen.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          preferences,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      preferences: citizen.preferences,
    });
  } catch (error) {
    console.error("updateMyPreferences error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update preferences",
    });
  }
};