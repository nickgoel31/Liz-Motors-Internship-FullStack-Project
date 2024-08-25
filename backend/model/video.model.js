import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

export const Video = mongoose.model("Video", videoSchema);
