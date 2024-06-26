import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 200,
    },
    newsContent: {
      type: String,
      required: true,
      trim: true,
      min: 50,
      max: 5000,
    },
    picture: {
      type: String, // Assuming picture is stored as a URL
      required: false, // Set to false to make it optional
    },
    video: {
      type: String, // Assuming video is stored as a URL
      required: false, // Set to false to make it optional
    },
  },
  {
    // timestamps: true,
    versionKey: false,
  }
);

const News = mongoose.model("News", newsSchema);
export default News;
