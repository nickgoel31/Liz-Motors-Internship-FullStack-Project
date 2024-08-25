import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  mdxContent: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  sequence: {
    type: Number,
    required: true,
  },
});

export const Module = mongoose.model("Module", moduleSchema);
