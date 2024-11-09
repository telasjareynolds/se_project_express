function checkErrors(err, res) {
  console.error(err);

  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Invalid ID format" });
  } else if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ message: "Malformed JSON in request body" });
  } else if (err.code === 11000) {
    res.status(409).send({ message: "Duplicate key error" });
  } else if (err.name === "NotFoundError" || err.name === "DocumentNotFoundError" || err.name === "AssertionError") {
    res.status(404).send({ message: "Resource not found" });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: "Unauthorized access" });
  } else if (err.name === "ForbiddenError") {
    res.status(403).send({ message: "Forbidden" });
  } else {
    res.status(500).send({ message: "An internal server error occurred" });
  }
}
module.exports = { checkErrors };
