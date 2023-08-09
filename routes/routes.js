const express = require("express");
const getVideos = require("../services/video");
const { getComment, pushComment } = require("../services/comment");
const getProduct = require("../services/product");

const router = express.Router();

// router.get("/", async (req, res) => {
//   const newProduct = new Product({
//     title: "A",
//     productURL: "ABC.com",
//     price: 100,
//   });

//   try {
//     const productToSave = await newProduct.save();
//     res.status(200).json(productToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.get("/", async (req, res) => {
  try {
    // call services to get all list video
    const videos = await getVideos();
    res.status(200).json({ videos });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const videoId = req.params.id;

    // call services to get all products list in a video
    const products = await getProduct(videoId);
    res.status(200).json({ products: products });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    // call services to get all list comment in a video
    const comment = await getComment(videoId);
    console.log(comment);
    res.status(200).json({ comment: comment });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/comment", async (req, res) => {
  try {
    const { username, comment, videoId } = req.body;
    if (!username || !comment || !videoId) {
      throw new Error("Insufficient Parameter");
    }

    // call service to post comment
    const data = await pushComment(username, comment, videoId);
    res.status(200).json({ success: { data } });
  } catch (e) {
    res.status(400).json({ failed: e.message });
  }
});

module.exports = router;
