function checkErrors(err, res) {
  console.error(err);

  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: err.message });
  } else if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ message: err.message });
  } else if (err.code === 11000) {
    res.status(409).send({ message: err.message });
  } else if (err.name === "NotFoundError" || err.name === "DocumentNotFoundError" || err.name === "AssertionError") {
    res.status(404).send({ message: err.message });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: err.message });
  } else if (err.name === "ForbiddenError") {
    res.status(403).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
}
module.exports = { checkErrors };
