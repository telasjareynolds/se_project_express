function checkErrors(err, res) {
  console.error(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  } if (err.code === 11000) {
    return res.status(409).send({ message: err.message });
  } if (
    err.name === "NotFoundError" ||
    err.name === "AssertionError" ||
    err.name === "DocumentNotFoundError"
  ) {
    return res.status(404).send({ message: err.message });
  } if (err.statusCode === 404) {
    return res.status(404).send({ message: err.message });
  } if (err.name === "UnauthorizedError") {
    return res.status(401).send({ message: err.message });
  } if (err.name === "ForbiddenError") {
    return res.status(403).send({ message: err.message });
  } 
    return res.status(500).send({ message: err.message });
  
}

module.exports = { checkErrors };
