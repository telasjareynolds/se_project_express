const router = require("express").Router();
const {
  deleteClothingItem,
  updateClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

//CRUD
router.post("/", createClothingItem);

router.get("/", getClothingItems);

router.put("/:itemId", updateClothingItem);

router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeClothingItem);

router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
