import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { Branch } from "../model/branch.model.js";

async function createBranchController(req, res) {
  const { branchName, branchDescription } = req.body;

  if (!branchName) {
    return res.status(400).json({ error: "Branch name is required" });
  }

  const branch = new Branch({
    name: branchName,
    description: branchDescription || "",
  });

  branch
    .save()
    .then(() => {
      console.log("Branch created successfully");
      return res.json({ message: "Branch created successfully" });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ error: "Failed to create branch", details: err.message });
    });
}

export { createBranchController };
