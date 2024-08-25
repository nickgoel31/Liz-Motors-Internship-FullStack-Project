import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./view/auth.js";
import userRouter from "./view/user.js";
import adminRouter from "./view/admin.js";
import branchRouter from "./view/branch.js";
import moduleRouter from "./view/module.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

//MIDDLEWARES

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Liz Motors' Internship API");
});

mongoose
  .connect(
    "mongodb+srv://harshgoel:pXor7su7Dn2jEhqK@cluster0.gdcegvu.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

//ROUTES
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", adminRouter);

app.use("/api", branchRouter);
app.use("/api", moduleRouter);

app.listen(port, () => {
  console.log("Server is running on render port ");
});
