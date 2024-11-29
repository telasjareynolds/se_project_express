const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFoundError } = require("../errors/NotFoundError");

router.use("/", userRouter);
router.use("/items", clothingItemRouter);

router.use(() => {
  throw new NotFoundError(
    "The requested resource was not found on the server. Please check your request and try again."
  );
});

module.exports = router;
