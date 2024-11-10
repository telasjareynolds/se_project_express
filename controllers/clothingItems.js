const ClothingItem = require("../models/clothingItem");
const {checkErrors} = require("../utils/errors");

//Implement CRUD

//creates item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;
  // console.log("Request body:", req.body);
  // console.log("User ID:", req.user._id);

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      return res.send({ item });
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

//reads all items
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      return res.send({ data: items });
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

//updates item
const updateClothingItem = (req, res) => {
  const { itemId } = req.params;
  const data = req.body;
  ClothingItem.findByIdAndUpdate(itemId, data, {
    new: true,
    runValidators: true,
  })
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.send({ item });
    })

    .catch((err) => {
      checkErrors(err, res);
    });
};

//deletes item
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndRemove(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      return res.send({ item });
    })

    .catch((err) => {
      checkErrors(err, res);
    });
};

// like the clothing item

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
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      return res.send({ item });
    })

    .catch((err) => {
      checkErrors(err, res);
    });
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
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      return res.send({ item });
    })

    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports = {
  deleteClothingItem,
  updateClothingItem,
  createClothingItem,
  getClothingItems,
  likeClothingItem,
  dislikeClothingItem,
};
