import express from "express";
import { createBranchController } from "../controllers/branch.controller.js";
import { createModuleController } from "../controllers/module.controller.js";

const router = express.Router();

router.post("/create/branch", createBranchController);
router.post("/create/module", createModuleController);

export default router;
