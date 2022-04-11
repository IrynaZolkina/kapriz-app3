import express from "express";
//import axios from "axios";

//import sharp from "sharp";
import fs from "fs";
//import blob from "blob";
//import Blob from "cross-blob";
//import FileDownload from "js-file-download";

//import { check, validationResult } from "express-validator";
//import Collections from "../models/CollectionsModel.js";
import Product from "../models/productModel.js";

//import download from "image-downloader";
//import FormData from "form-data";

const router = express.Router();

router.post("/data", async (req, res) => {
  console.log("hellooooooooooooooooooooooooo");
  //const errors = validationResult(req);
  //if (!errors.isEmpty()) {
  //  console.log(req.body);
  //  return res.status(400).json({ errors: errors.array() });
  //}

  console.log(req.body);

  const {
    title,
    titleCode,
    codeTovara,
    price,
    discountPrice,
    id,
    novinka,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    imageUrl4,
    imageUrl5,
    imageUrl6,
    imageUrl7,
    palitra,
    arrayApplying,
    arrayContent,
    arrayDescription,
    collectionsArray,

    createdAt,
  } = req.body;

  // Check if product exists
  let item = await Product.findOne({ idFirebase: id });

  if (item) {
    return res.status(400).send("Item already exists");
    //return res.status(400).json({ errors: [{ msg: "Item already exists" }] });
  } else {
    const itemNew = new Product({
      name: title,
      titleCode: titleCode,
      codeTovara: codeTovara,
      price: price,
      priceDiscounted: discountPrice,
      idFirebase: id,
      new: novinka,
      image: imageUrl1,
      imageUrl2: imageUrl2,
      imageUrl3: imageUrl3,
      imageUrl4: imageUrl4,
      imageUrl5: imageUrl5,
      imageUrl6: imageUrl6,
      imageUrl7: imageUrl7,
      palitra: palitra,
      arrayApplying: arrayApplying,
      arrayContent: arrayContent,
      arrayDescription: arrayDescription,
      collectionsList: collectionsArray,
      reviews: [],
      rating: 0.0,
      numReviews: 0,
      countInStock: 1,
      date: new Date(
        createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
      ),
    });
    console.log("itemNew._id+++++++++", itemNew.id);

    // Saving to Database
    item = await itemNew.save();
    res.json(item);
  }
});

// Create new collections and put items into collections from items
/* router.get("/collections", [], async (req, res) => {
  console.log("success");
  await Collections.deleteMany();
  let items = await Item.find({});
  //let collection = await Collections.find();
  let collections = [];
  let ind = 0;

  items.map((item) => {
    // we are inside the item
    const collectionsList = item.collectionsList;

    // console.log("list---", list, typeof list);
    collectionsList.map((collectionCode) => {
      // inside item's collection list
      // console.log(`Collection ${collectionCode} `);
      // for collectionCode find collection in collections
      const filt = collections.filter((el) => el.code === collectionCode);
      if (filt.length === 0) {
        const newCollection = {
          code: collectionCode,
          //name: "VASYA", doesn't need name
          products: [],
        };
        collections = [newCollection, ...collections];
      } else {
        ind = collections.findIndex((el) => el.code === collectionCode);
      }
      const [fil] = filt;
      const prod = {
        product: item._id,
        title: item.title,
        titleCode: item.titleCode,
        price: item.price,
        priceDiscounted: item.priceDiscounted,
        new: item.new,
        imageUrl1: item.imageUrl1,
        imageUrl2: item.imageUrl2,
        date: item.date,
      };
      const pr = collections[ind].products;
      collections[ind].products = [prod, ...pr];

      //console.log(fil.products, "----fil");
      //console.log(ind, "----index");
    });
  });
  //console.log(collection[0]);
  // sort by cod

  collections.sort((a, b) => parseInt(a.code) - parseInt(b.code));

  await Collections.insertMany(collections);
  //await collection.save();
});
 */
//**************** */
/* router.post("/img", [], async (req, res) => {
  // console.log(
  //  "https://firebasestorage.googleapis.com/v0/b/cat2-ac7df.appspot.////com/o/kapris%2Fkapris%2Fimg36.jpg?alt=media&/token=b4df2b85-bd8b-4043-ad10-7de71d7261a2"
  ); 

  let items = await Product.find({});
  items.map((item, ind) => {
    if (ind < 3) {
      if (item.image) {
        console.log(item.image);
        options = {
          url: `${item.image}`,
          dest: `/WEB/kapriz-0-2/client/public/img/image${item._id}.jpg`, // will be saved to /path/to/dest/photo.jpg
        };
        console.log(options.dest, "*****************");
        download
          .image(options)
          .then(({ filename }) => {
            console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
          })
          .catch((err) => console.error(err));
      }

      if (item.imageUrl2) {
        console.log(item.imageUrl2);
        options = {
          url: `${item.imageUrl2}`,
          dest: `/WEB/kapriz-0-2/client/public/img/imageUrl2${item._id}.jpg`, // will be saved to /path/to/dest/photo.jpg
        };
        console.log(options.dest, "*****************");
        download
          .image(options)
          .then(({ filename }) => {
            console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
          })
          .catch((err) => console.error(err));
      }
      if (item.imageUrl3) {
        console.log(item.imageUrl3);
        options = {
          url: `${item.imageUrl3}`,
          dest: `/WEB/kapriz-0-2/client/public/img/imageUrl3${item._id}.jpg`, // will be saved to /path/to/dest/photo.jpg
        };
        console.log(options.dest, "*****************");
        download
          .image(options)
          .then(({ filename }) => {
            console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
          })
          .catch((err) => console.error(err));
      }
    }
  });

  items.map(async (item, ind) => {
    console.log(item);
    if (ind < 3) {
      let item1 = await Product.findById(item.id);
      if (item1) {
        if (item1.image) {
          item1.image = `/img/image${item._id}.jpg`;
        }
        if (item1.imageUrl2) {
          item1.imageUrl2 = `/img/imageUrl2${item._id}.jpg`;
        }
        if (item1.imageUrl3) {
          item1.imageUrl3 = `/img/imageUrl3${item._id}.jpg`;
        }
        await item1.save();
      }
    }
  }); */

// console.log(__dirname);

// .then(async () => {
//   const image = await sharp(`/path/photo${num}.jpg`).jpeg().toBuffer();
//   fs.writeFileSync(`/path/ph__oto${num}.jpg`, image);
// })

/* const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "foxic2020");


    Axios.post(
      "https://api.cloudinary.com/v1_1/dyzipz9un/image/upload",
      formData
    ).then((res) => {
      console.log(res.data.url);
      setUrlShow(res.data.url);
    }); */

/* const num = 25;
  options = {
    url:
      " https://firebasestorage.googleapis.com/v0/b/justclockit-a0fa1.appspot.com/o/kapris%2Fnavbar%2Fparfum%2Fphoto_2020-05-27_04-08-48.jpg?alt=media&token=055de8b8-a7dc-4dc3-9f19-4d59d7365454",
    dest: `/path/photo${num}.jpg`, // will be saved to /path/to/dest/photo.jpg
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error(err));
     */
// });

export default router;
