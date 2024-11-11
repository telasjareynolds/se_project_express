const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);


router.use((err, req, res) => {
  const NOT_FOUND = 404;
  console.error(err)

  const statusCode = err.statusCode || NOT_FOUND;
  res.status(statusCode).send({ message: "The requested resource was not found on the server. Please check your request and try again." });
});

module.exports = router;
