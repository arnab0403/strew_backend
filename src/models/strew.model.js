const mongoose = require("mongoose");

const strewSchema = new mongoose.Schema(
  {
    // Kept as `tittle` to match the API field requested by the client.
    tittle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    thumbnail: { type: [String], default: [] },
    s3_video_source: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const StrewModel = mongoose.model("Strew", strewSchema);

module.exports = StrewModel;
