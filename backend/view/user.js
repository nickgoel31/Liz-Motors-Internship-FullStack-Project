import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/get/user", getUserController);
router.put("/update/user", updateUserController);

export default router;
