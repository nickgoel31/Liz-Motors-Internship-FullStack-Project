import express from "express";
import { Branch } from "../model/branch.model.js";

const router = express.Router();

router.get("/branch/:id", async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    res.json(branch);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
