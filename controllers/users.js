const User = require("../models/user");
const { checkErrors } = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Creates a user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    return res.status(400).send({ message: error.message });
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        // Email already exists, so throw an error that goes to catch
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) =>
      res.send({
        user: { name: user.name, avatar: user.avatar, email: user.email },
      })
    )
    .catch((err) => checkErrors(err, res));
};

// // Returns all users
// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send({ users }))
//     .catch((err) => checkErrors(err, res));
// };

// // Finds user by ID
// const getUser = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .orFail()
//     .then((user) => res.send({ user }))
//     .catch((err) => checkErrors(err, res));
// };

// user login controller

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("This field is required");
    error.name = "ValidatorError";
    return res.status(400).send({ message: error.message });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => checkErrors(err, res));
};

// Finds user by ID
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) =>
      res.send({
        user: { name: user.name, avatar: user.avatar, email: user.email },
      })
    )
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ message: "An error occurred while retrieving user data" });
    });
};

// Modifies user data - updates profile
const modifyUserData = (req, res) => {
  const { name, avatar } = req.body;
  const updateData = { name, avatar };

  User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      res.send({ user: { name: user.name, avatar: user.avatar } });
    })
    .catch((err) => checkErrors(err, res));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
};
