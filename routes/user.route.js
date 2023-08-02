const auth = require("../middlewares/auth.middleware");

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = require("express").Router();
router.get("/", auth, getAllUser);
router.post("/", createUser);
router.get("/:id", auth, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
