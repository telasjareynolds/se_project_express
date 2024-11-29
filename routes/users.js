const router = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateLoginAuth,
  validateUserCreation,
  validateModifyUserData,
} = require("../middlewares/validation");

// create user
router.post("/signup", validateUserCreation, createUser);

// user login
router.post("/signin", validateLoginAuth, login);

// get logged in user
router.get("/users/me", auth, getCurrentUser);

// modify user's data
router.patch("/users/me", auth, validateModifyUserData, modifyUserData);

module.exports = router;
