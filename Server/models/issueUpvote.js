import mongoose from "mongoose";

const issueUpvoteSchema = new mongoose.Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
      index: true,
    },

    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// One citizen can upvote an issue only once
issueUpvoteSchema.index(
  { issueId: 1, citizenId: 1 },
  { unique: true }
);

export default mongoose.model("IssueUpvote", issueUpvoteSchema);