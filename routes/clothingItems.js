const router = require("express").Router();
const {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateItemCreation, validateId } = require("../middlewares/validation");

// CRUD
router.post("/", validateItemCreation, auth, createClothingItem);

router.get("/", getClothingItems);

router.put("/:itemId/likes", auth, likeClothingItem);

router.delete("/:itemId/likes", validateId, auth, dislikeClothingItem);

router.delete("/:itemId", validateId, auth, deleteClothingItem);

module.exports = router;
