import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { UserProgress } from "../model/userProgress.model.js";
import { Module } from "../model/module.model.js";

async function getUserController(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  const tokenUser = jwt.verify(token, process.env.JWTPRIVATEKEY);

  const user = await User.findById(tokenUser._id);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  return res.status(200).json({ data: user });
}

// async function createUserProgress(userId) {
//   if (!userId) {
//     return "User ID is required";
//   }
//   const user = await User.findById(userId);
//   if (!user) {
//     return "User not found";
//   }
//   const modules = await Module.find({ branchId: user.branchId });
//   if (!modules) {
//     return "Modules not found";
//   }

//   const userProgress = await UserProgress.findOne({ userId });
//   if (userProgress) {
//     return "User progress already exists";
//   }

//   const newUserProgress = new UserProgress({
//     userId,
//     progressPercentage: 0,
//     currentModuleId: String(modules[0]._id),
//     completedModulesId: [],
//     currentModuleVideoTime: 0,
//   });

//   newUserProgress
//     .save()
//     .then(() => {
//       console.log("User progress created successfully");
//       return "User progress created successfully";
//     })
//     .catch((err) => {
//       console.error(err);
//       return "Failed to create user progress";
//     });
// }

async function updateUserController(req, res) {
  const { userId, moduleId, videoTime, completed } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const currentModule = await Module.findById(moduleId);
    if (!currentModule) {
      return res.status(400).json({ message: "Module not found" });
    }
    const modules = await Module.find({ branchId: user.branchId });
    if (!modules) {
      return res.status(400).json({ message: "Modules not found" });
    }
    user.currentModuleVideoTime = videoTime;
    if (completed) {
      user.currentModuleVideoTime = 0;
      if (!user.completedModulesId.includes(moduleId)) {
        user.completedModulesId.push(moduleId);
        user.currentModuleId =
          currentModule.sequence < modules.length
            ? String(modules[currentModule.sequence]._id)
            : null;
      }
    }
    user
      .save()
      .then(() => {
        return res.status(200).json({ message: "User updated successfully" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Failed to update user", error: err });
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export { getUserController, updateUserController };
