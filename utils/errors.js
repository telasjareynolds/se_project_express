const mongoose = require("mongoose");

function checkErrors(err, res) {
  console.error(err);
  if (
    err.name === "BadRequestError" ||
    err.name === "CastError" ||
    err.name === "ValidationError" ||
    err.name === "ValidatorError"
  ) {
    return res.status(400).send({ message: err.message });
  }
  if (err.code === 11000 || err.statusCode === 409) {
    return res.status(409).send({ message: err.message });
  }
  if (err.statusCode === 404) {
    return res.status(404).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).send({ message: err.message });
  }
  if (
    err.name === "UnauthorizedError" ||
    err.name === "InvalidCredentialsError"
  ) {
    return res.status(401).send({ message: err.message });
  }
  if (err.name === "ForbiddenError" || err.statusCode === 403) {
    return res.status(403).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
}

// const DUPL

module.exports = { checkErrors };
