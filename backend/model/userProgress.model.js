import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  progressPercentage: {
    type: Number,
    required: true,
  },
  currentModuleId: {
    type: Number,
    required: true,
  },
  completedModulesId: {
    type: Array,
    required: false,
  },
  currentModuleVideoTime: {
    type: Number,
    required: true,
  },
});

export const UserProgress = mongoose.model("UserProgress", UserProgressSchema);
