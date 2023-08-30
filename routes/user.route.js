const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadPicture,
} = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization.middleware");
const path = require("path");
const multer = require("multer");
const isAdmin = require("../middlewares/isadmin.middleware");
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.join(__dirname, "..", "public", "users"));
  },
  filename: (request, file, callback) => {
    const MIME_MAP = {
      "image/png": "png",
      "image/gif": "gif",
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
    };

    callback(
      null,
      `user_profile_${request.user.id}.${MIME_MAP[file.mimetype]}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (request, file, callback) => {
    const mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (!mimeTypes.includes(file.mimetype)) {
      callback(null, false);
      request.hasError = true;
      request.errors = { picture: ["invalid file type"] };
      return;
    }

    callback(null, true);
  },
});

const router = require("express").Router();
router.get("/", authorization, getAllUser);
router.post("/", createUser);
router.get("/:id", authorization, getUser);
router.put("/:id", updateUser);
router.delete("/:id", authorization, isAdmin, deleteUser);
router.post(
  "/:id/picture",
  authorization,
  upload.single("picture"),
  uploadPicture
);

module.exports = router;
