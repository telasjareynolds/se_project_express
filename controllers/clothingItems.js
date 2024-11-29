const ClothingItem = require("../models/clothingItem");

const { SUCCESSFUL_REQUEST } = require("../utils/errors");

const { BadRequestError } = require("../errors/BadRequestError");
const { NotFoundError } = require("../errors/NotFoundError");
const { ForbiddenError } = require("../errors/ForbiddenError");


// Implement CRUD
// creates item
const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("This field is invalid"));
      } else {
        next(err);
      }
    });
};

// reads all items
const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => next(err));
};

// deletes item
const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("Not authorized to delete item");
      }
      return ClothingItem.findByIdAndRemove(itemId);
    })
    .then(() =>
      res
        .status(SUCCESSFUL_REQUEST)
        .send({ message: "Item deleted successfully" })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id is in an invalid format"));
      } else {
        next(err);
      }
    });
};

//  like the clothing item
const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!itemId) {
    throw new BadRequestError("Item ID is required");
  }

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.send(item))

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Id in incorrect format"));
      } else {
        next(err);
      }
    });
};

const dislikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.send(item))

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Id in incorrect format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
};
