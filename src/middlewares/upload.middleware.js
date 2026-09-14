const multer = require("multer");

const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_VIDEO_SIZE_BYTES, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("video/")) {
      const error = new Error("Only video files are allowed");
      error.statusCode = 400;
      return callback(error);
    }

    return callback(null, true);
  },
});

function uploadVideo(req, res, next) {
  upload.single("video")(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      error.message = "Video must be 50 MB or smaller";
      error.statusCode = 400;
    }

    return next(error);
  });
}

module.exports = { uploadVideo, MAX_VIDEO_SIZE_BYTES };
