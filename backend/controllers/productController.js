import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Collection from "../models/collectionModel.js";
import ImageCl from "../models/imagesModel.js";

import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: "dyzipz9un",
  api_key: "455986812258877",
  api_secret: "j_jchITqwZ1s5wqcaeGa8XQzVfE",
});
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  //const pageSize = 10;
  const pageSize = Number(req.query.pageSize) || 20;
  const collection = req.query.collection;
  //let sortBy = req.query.sortBy || { name: 1 };
  let sortBy = null;
  if (req.query.sortBy) {
    req.query.sortBy === "nameza"
      ? (sortBy = { name: -1 })
      : req.query.sortBy === "priceasc"
      ? (sortBy = { price: 1 })
      : req.query.sortBy === "pricedesc"
      ? (sortBy = { price: -1 })
      : null;
  } else {
    sortBy = { name: 1 };
  }
  //const sortIndex = req.query.sortIndex || 1;
  const page = Number(req.query.pageNumber) || 1;

  console.log(sortBy, collection, "---collection");

  if (collection.length > 0) {
    const count = await Product.countDocuments({
      collectionsList: { $elemMatch: { $eq: collection } },
    });
    //console.log(count);

    const products = await Product.find({
      collectionsList: { $elemMatch: { $eq: collection } },
    })
      .sort(sortBy)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    //console.log("products-----", products.length);
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });

    /*
     */
  } else {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.publicIdImage1 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage1,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));
    product.publicIdImage2 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage2,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));
    product.publicIdImage3 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage3,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));
    product.publicIdImage4 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage4,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));
    product.publicIdImage5 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage5,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));
    product.publicIdImage6 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage6,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));
    product.publicIdImage7 &&
      (await cloudinary.uploader.destroy(
        product.publicIdImage7,
        {
          invalidate: true,
        },
        async (err, result) => {
          if (err) throw err;
          res.json({ msg: "Deleted Image" });
        }
      ));

    product.palitra &&
      product.palitra.map(async (element) => {
        element.numberPublicId &&
          (await cloudinary.uploader.destroy(
            element.numberPublicId,
            {
              invalidate: true,
            },
            async (err, result) => {
              if (err) throw err;
              res.json({ msg: "Deleted Image" });
            }
          ));
      });

    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    priceDiscounted: 0,
    user: req.user._id,
    //image: "/images/sample.jpg",
    //brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const copyProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const product1 = new Product({
      user: req.user._id,

      name: product.name,
      titleCode: product.titleCode,
      price: product.price,
      priceDiscounted: product.priceDiscounted,
      novinka: product.novinka,
      countInStock: 0,
      numReviews: 0,
      arrayApplying: product.arrayApplying,
      arrayContent: product.arrayContent,
      arrayDescription: product.arrayDescription,
      collectionsList: product.collectionsList,
    });

    const copiedProduct = await product1.save();

    res.status(201).json(copiedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    titleCode,
    codeTovara,
    price,
    priceDiscounted,
    novinka,
    palitra,
    arrayApplying,
    arrayContent,
    arrayDescription,
    collectionsList,
    category,
    description,
    countInStock,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    imageUrl4,
    imageUrl5,
    imageUrl6,
    imageUrl7,
    publicIdImage1,
    publicIdImage2,
    publicIdImage3,
    publicIdImage4,
    publicIdImage5,
    publicIdImage6,
    publicIdImage7,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.titleCode = titleCode;
    product.codeTovara = codeTovara;
    product.price = price;
    product.priceDiscounted = priceDiscounted;
    product.novinka = novinka;
    product.palitra = palitra;
    product.arrayApplying = arrayApplying;
    product.arrayContent = arrayContent;
    product.arrayDescription = arrayDescription;
    product.collectionsList = collectionsList;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;

    product.imageUrl1 = imageUrl1;
    product.imageUrl2 = imageUrl2;
    product.imageUrl3 = imageUrl3;
    product.imageUrl4 = imageUrl4;
    product.imageUrl5 = imageUrl5;
    product.imageUrl6 = imageUrl6;
    product.imageUrl7 = imageUrl7;
    product.publicIdImage1 = publicIdImage1;
    product.publicIdImage2 = publicIdImage2;
    product.publicIdImage3 = publicIdImage3;
    product.publicIdImage4 = publicIdImage4;
    product.publicIdImage5 = publicIdImage5;
    product.publicIdImage6 = publicIdImage6;
    product.publicIdImage7 = publicIdImage7;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @desc    Delete image from cloudinary
// @route   POST /api/products/deleteimage
// @access  Private
const deleteImage = asyncHandler(async (req, res) => {
  console.log("000000000000000000000000000000");
  console.log(req.params.imagenumber);
  console.log(req.params.id);
  const id = req.params.id;
  const imageNumber = req.params.imagenumber;
  const product = await Product.findById(id);
  const image = await ImageCl.findOne({
    parent_id: id,
    imageUrl: product.imageUrl1,
  });
  console.log(image.imageSecretId);
  const public_id = image.imageSecretId;
  console.log(image._id);
  //await image.remove();

  try {
    if (!public_id) return res.status(400).json({ msg: "No images Selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createCollection = asyncHandler(async (req, res) => {
  console.log("object");
  const collection = new Collection({
    name: "Sample name",

    code: "Sample code",
    products: [],

    description: "Sample description",
  });

  const createdCollection = await collection.save();
  res.status(201).json(createdCollection);
});

export {
  getProducts,
  getProductById,
  copyProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  deleteImage,
  createCollection,
};
