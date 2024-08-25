import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

export var SALT = 10;

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found. Please contact your admin." });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) {
      return res.status(500).json({ error: "Passwords do not match" });
    }

    //set the user's session and cookie to client
    const token = user.generateAuthToken();
    return res
      .status(200)
      .send({ data: token, message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

export { login };
