import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const Branch = mongoose.model("Branch", branchSchema);
