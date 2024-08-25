import express from "express";
import { Module } from "../model/module.model.js";

const router = express.Router();

router.get("/get/modules/:branchId", async (req, res) => {
  try {
    const modules = await Module.find({ branchId: req.params.branchId });
    res.json(modules);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/module/:moduleId", async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    res.json(module);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
