const User = require("../models/user");
const { checkErrors } = require("../utils/errors");

//Creates a user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      return res.send({ user });
    })
    .catch((err) => checkErrors(err, res));
};

//Returns all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).send({ message: "No users found" });
      }
      return res.send({ users });
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

//Finds user by ID
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      return res.send({ user });
    })

    .catch((err) => {
      console.log(res.status);
      checkErrors(err, res);
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
