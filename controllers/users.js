const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SUCCESSFUL_REQUEST } = require("../utils/errors");

const { BadRequestError } = require("../errors/BadRequestError");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const { NotFoundError } = require("../errors/NotFoundError");
const { ConflictError } = require("../errors/ConflictError");

const { JWT_SECRET } = require("../utils/config");

// Creates a user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email or password not valid");
  }

  return User.findOne({ email })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then(() => res.status(SUCCESSFUL_REQUEST).send({ message: "User created" }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid user data"));
      } else if (err.code === 11000) {
        next(new ConflictError("User with this email already exists"));
      } else {
        next(err); // Pass other unexpected errors to the centralized error handler
      }
    });
};

// user login controller
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({
        token,
        user: {
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === "UnauthorizedError") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid input data"));
      } else {
        next(err);
      }
    });
};

// Finds user by ID
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("Current user not found");
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }
      res.send({
        user: {
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

// Modifies user data - updates profile
const modifyUserData = (req, res, next) => {
  const { name, avatar } = req.body;
  const updateData = { name, avatar };

  User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) =>
      res.send({ user: { name: user.name, avatar: user.avatar } })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid input data"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
};
