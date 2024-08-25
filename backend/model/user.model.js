import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  // },
  hashedPassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  progressPercentage: {
    type: Number,
    default: 0,
  },
  currentModuleId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  completedModulesId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  currentModuleVideoTime: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
