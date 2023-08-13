const Video = require("../models/video");
const mongoose = require("mongoose");

async function getProduct(videoId) {
  // https://www.geeksforgeeks.org/mongoose-aggregate-prototype-lookup-api/
  const data = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      },
    },
  ]);

  return data;
}

module.exports = getProduct;
