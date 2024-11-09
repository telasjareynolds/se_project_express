const router = require("express").Router();
const { getUser, getUsers, createUser } = require("../controllers/users");

//Get all users
router.get("/", getUsers);

//Get user by ID
router.get("/:userId", getUser);

//Creates a new user
router.post("/", createUser);

module.exports = router;
