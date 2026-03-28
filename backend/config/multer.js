// config/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mindmine-institute/students/documents",
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "webp", "avif"],
    format: "jpg",
  },
});

const upload = multer({ storage });

module.exports = upload;
