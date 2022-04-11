const mongoose = require("mongoose");

const productColSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "Product",
    },
    name: {
      type: String,
      //required: true,
    },
    titleCode: {
      type: String,
    },

    price: {
      type: Number,
    },
    priceDiscounted: {
      type: Number,
    },
    new: {
      type: Boolean,
      default: false,
    },
    imageUrl1: {
      type: String,
      //required: true,
    },
    imageUrl2: {
      type: String,
    },

    rating: {
      type: Number,
      //required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      //required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ProductCol = mongoose.model("itemscol", productColSchema);
