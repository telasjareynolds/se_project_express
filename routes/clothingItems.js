const router = require("express").Router();
const {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middleware/auth");

// CRUD
router.post("/", auth, createClothingItem);

router.get("/", getClothingItems);

router.delete("/:itemId", auth, deleteClothingItem);

router.put("/:itemId/likes", auth, likeClothingItem);

router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
