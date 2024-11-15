const ClothingItem = require("../models/clothingItem");

const {
  checkErrors,
  NOT_FOUND,
  UNAUTHORIZED_ERROR,
} = require("../utils/errors");

// Implement CRUD
// creates item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ item }))
    .catch((err) => checkErrors(err, res));
};

// reads all items
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => checkErrors(err, res));
};

// deletes item
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        const error = new Error("Not authorized to delete item");
        error.statusCode = UNAUTHORIZED_ERROR;
        throw error;
      }
      return ClothingItem.findByIdAndRemove(itemId);
    })
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => checkErrors(err, res));
};

//  like the clothing item
const likeClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send({ item }))

    .catch((err) => checkErrors(err, res));
};

const dislikeClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send({ item }))

    .catch((err) => checkErrors(err, res));
};

module.exports = {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
};
