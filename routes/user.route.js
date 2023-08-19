const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadPicture,
} = require("../controllers/user.controller");
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'users'));
  },
  limits:{
    fileSize: 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(file.mimetype)) {
      cb(null, false);
      return;
    }

    cb(null, true);
  },
  filename: function (req, file, cb) {
    const MIME_TYPE_MAP = {
      'image/png': 'png',
      'image/jpeg': 'jpeg',
      'image/jpg': 'jpg',
      'image/gif': 'gif'
    };
    cb(null, `user_profile_${req.user.id}.${MIME_TYPE_MAP[file.mimetype]}`);
  } 
});

const upload = multer({ storage });

const authorization = require("../middlewares/authorization.middleware");

const router = require("express").Router();
router.post('/:id/picture', upload.single('picture'), uploadPicture)
router.get("/", authorization, getAllUser);
router.post("/", createUser);
router.get("/:id", authorization, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
