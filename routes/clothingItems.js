const router = require("express").Router();
const {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateItemCreation,
  validateId,
} = require("../middlewares/validation");

// CRUD
router.post("/", auth, validateItemCreation, createClothingItem);

router.get("/", getClothingItems);

router.put("/:itemId/likes", auth, validateId,likeClothingItem);

router.delete("/:itemId/likes", auth, validateId, dislikeClothingItem);

router.delete("/:itemId", auth, validateId, deleteClothingItem);

module.exports = router;
