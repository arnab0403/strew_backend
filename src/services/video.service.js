const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

class VideoService {
  static getAllPremiumVideos() {
    return new Promise((resolve, reject) => {
      fs.readdir("./Premium", (err, files) => {
        if (err) return reject(err);
        const videos = files.map((file) => ({
          name: file
        }));
        resolve(videos);
      });
    });
  }

  static getVideosThumbnail(name, rootDir) {
    const thumbnailName = name.split(".")[0] + ".jpg";
    const thumbnailPath = path.join(rootDir, "Thumbnails", thumbnailName);

    if (fs.existsSync(thumbnailPath)) {
      return thumbnailPath;
    } else {
      ffmpeg.setFfmpegPath(ffmpegInstaller.path);
      const xPath = path.join(rootDir, "Premium", name);
      ffmpeg(xPath)
        .screenshots({
          timestamps: ["00:00:04"],
          filename: thumbnailName,
          folder: path.join(rootDir, "Thumbnails"),
          size: "1020x720"
        })
        .on("end", () => console.log("Thumbnail created!"))
        .on("error", (err) => console.error("Error:", err));

      return thumbnailPath;
    }
  }

  static streamVideo(name, rangeHeader, req, res, rootDir) {
    const videoPath = path.join(rootDir, "Premium", name);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const parts = rangeHeader.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const header = {
      "Content-Type": "video/mp4",
      "Content-Length": chunkSize,
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${fileSize}`
    };

    res.writeHead(206, header);
    const videoStreamInstance = fs.createReadStream(videoPath, { start, end });
    videoStreamInstance.pipe(res);
  }
}

module.exports = VideoService;
