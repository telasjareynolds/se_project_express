const router = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

// create user
router.post("/signup", createUser);

// user login
router.post("/signin", login);

// get logged in user
router.get("/users/me", auth, getCurrentUser);

// modify user's data
router.patch("/users/me", auth, modifyUserData);

module.exports = router;
