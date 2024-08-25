import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { Module } from "../model/module.model.js";
import { Branch } from "../model/branch.model.js";
import { Video } from "../model/video.model.js";

async function createModuleController(req, res) {
  const { branchId, mdxContent, title, htmlContent, videoUrl, sequence } =
    req.body;

  if (!branchId || !title || !sequence || !mdxContent || !videoUrl) {
    return res
      .status(400)
      .json({ error: "All fields are required to create a module" });
  }

  try {
    // Find the branch
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Create a new module
    const module = new Module({
      branchId,
      mdxContent: mdxContent | "",
      title,
      htmlContent: htmlContent | "",
      videoUrl: videoUrl | "",
      sequence,
    });

    // Save the module
    const savedModule = await module.save();

    console.log("Module created successfully");

    return res.json({ message: "Module created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create module" });
  }
}

export { createModuleController };
