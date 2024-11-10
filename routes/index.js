const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);


router.use((err, res) => {
  console.error(err)
  res.status(404).send({ message: err.message });
});

module.exports = router;
