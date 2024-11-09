function checkErrors(err, res) {
  console.error(err);
  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message });
  } else if (err.name === "NotFoundError") {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
}

module.exports = { checkErrors };
