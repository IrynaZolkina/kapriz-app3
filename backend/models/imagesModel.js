import mongoose from "mongoose";

const ImageClSchema = new mongoose.Schema({
  imageSecretId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  original_filename: {
    type: String,
  },
  parent_id: {
    type: String,
  },
  firebase_parent_id: {
    type: String,
  },
});
const ImageCl = mongoose.model("images", ImageClSchema);
export default ImageCl;
