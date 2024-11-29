const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError("Authorization required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    throw new UnauthorizedError("Authorization required");
  }
  req.user = payload;
  return next();
};
