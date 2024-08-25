import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

export var SALT = 10;

async function register(req, res) {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!hashedPassword) {
    return res.status(500).json({ error: "Failed to hash password" });
  }
  const user = new User({
    email,
    hashedPassword,
    role,
    branchId: "66c729e6d67f84759ea36f6c", // FOR DEMO APP ONLY (IN REAL APP, ADMIN WOULD BE ABLE TO REGISTER MEMBERS AND ASSIGN THEM AND CREATE NEW BRANCHES)
    currentModuleId: "66c72b0b549b1ff36d64ca60",
  });

  user
    .save()
    .then(() => {
      console.log("User registered successfully");
      return res.json({ message: "User registered successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Failed to register user" });
    });
}

export { register };
