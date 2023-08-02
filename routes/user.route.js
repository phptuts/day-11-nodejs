const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization.middleware");

const router = require("express").Router();
router.get("/", authorization, getAllUser);
router.post("/", createUser);
router.get("/:id", authorization, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
