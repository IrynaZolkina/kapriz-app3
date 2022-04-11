import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String, //required: true
    },
    rating: {
      type: Number, //required: true
    },
    comment: {
      type: String, //required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "User",
    },
    name: {
      type: String,
      //required: true,
    },
    titleCode: {
      type: String,
    },
    codeTovara: {
      type: String,
      default: "",
    },
    price: {
      type: Number,

      //required: true,
      default: 0,
    },
    priceDiscounted: {
      type: Number,
    },
    idFirebase: {
      type: String,
      //required: true,
    },
    novinka: {
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
    imageUrl3: {
      type: String,
    },
    imageUrl4: {
      type: String,
    },
    imageUrl5: {
      type: String,
    },
    imageUrl6: {
      type: String,
    },
    imageUrl7: {
      type: String,
    },
    publicIdImage1: {
      type: String,
    },
    publicIdImage2: {
      type: String,
    },
    publicIdImage3: {
      type: String,
    },
    publicIdImage4: {
      type: String,
    },
    publicIdImage5: {
      type: String,
    },
    publicIdImage6: {
      type: String,
    },
    publicIdImage7: {
      type: String,
    },
    palitra: {
      type: Array,
    },
    arrayApplying: {
      type: Array,
    },
    arrayContent: {
      type: Array,
    },
    arrayDescription: {
      type: Array,
    },

    collectionsList: {
      type: Array,
    },

    category: {
      type: String,
      //required: true,
    },
    description: {
      type: String,
      //required: true,
    },
    reviews: [reviewSchema],
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

    countInStock: {
      type: Number,
      //required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("testitems", productSchema);

export default Product;
