const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Authorization required" });
  }
  req.user = payload;
  return next();
};
