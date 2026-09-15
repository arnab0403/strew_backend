const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { randomUUID } = require("crypto");
const path = require("path");
const env = require("../config/env");
const StrewModel = require("../models/strew.model");

const s3Client = new S3Client({ region: env.AWS_REGION });

async function uploadVideo(file) {
    if (!env.AWS_S3_BUCKET) {
      const error = new Error("AWS_S3_BUCKET is not configured");
      error.statusCode = 500;
      throw error;
    }

    const extension = path.extname(file.originalname).toLowerCase() || ".mp4";
    const key = `videos/${Date.now()}-${randomUUID()}${extension}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      bucket: env.AWS_S3_BUCKET,
      key,
      contentType: file.mimetype,
      size: file.size,
    };
}

async function createStrew(data) {
    return StrewModel.create({
      tittle: data.tittle,
      description: data.description,
      genre: data.genre,
      tags: parseStringArray(data.tags),
      thumbnail: parseStringArray(data.thumbnail),
      s3_video_source: data.s3_video_source,
    });
}

async function getStrews() {
    return StrewModel.find().sort({ createdAt: -1 });
}

function parseStringArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return [value];
  }
}

module.exports = { uploadVideo, createStrew, getStrews };
