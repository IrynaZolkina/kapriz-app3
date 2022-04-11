import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
  },

  code: {
    type: String,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
});

const Collection = mongoose.model("collections", collectionSchema);

export default Collection;
