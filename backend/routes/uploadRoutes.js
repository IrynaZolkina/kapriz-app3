import path from "path";
import fs from "fs";
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
const router = express.Router();
import Product from "../models/productModel.js";

/* cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
 */
cloudinary.config({
  cloud_name: "dyzipz9un",
  api_key: "455986812258877",
  api_secret: "j_jchITqwZ1s5wqcaeGa8XQzVfE",
});

/* const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});
 */
router.post("/del/:publicid", async (req, res) => {
  //router.post("/del/:publicid/:productid", async (req, res) => {
  try {
    console.log("hello");
    const publicId = `fox2020/${req.params.publicid}`;
    //const productId = req.params.productid;
    console.log(publicId, "-------------- publicId");
    //console.log(productId, " -------------- productId");

    //const product = await Product.findById(req.params.productid);
    //if (product) {
    //console.log(product);

    //console.log(product.imageUrl1, "888888888888888888");
    //console.log(product.publicIdImage1, "888888888888888888");
    //product.publicIdImage1 = "";
    //product.imageUrl1 = "";

    //const updatedProduct = await product.save();
    //res.json(updatedProduct);
    //if (!public_id) return res.status(400).json({ msg: "No images Selected" });

    await cloudinary.uploader.destroy(
      publicId,
      {
        invalidate: true,
      },
      async (err, result) => {
        if (err) throw err;

        res.json({ msg: "Deleted Image" });
      }
    );
    // }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

export default router;
