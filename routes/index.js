const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  const NOT_FOUND = 404;
  res
    .status(NOT_FOUND)
    .send({
      message:
        "The requested resource was not found on the server. Please check your request and try again.",
    });
});

module.exports = router;
