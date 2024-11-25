const router = require("express").Router();
const {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// CRUD
router.post("/items", auth, createClothingItem);

router.get("/items", getClothingItems);

router.put("/:itemId/likes", auth, likeClothingItem);

router.delete("/:itemId/likes", auth, dislikeClothingItem);

router.delete("/items/:itemId", auth, deleteClothingItem);

module.exports = router;
