const Video = require("../models/video");

async function getProduct(videoId) {
  const data = await Video.findById(videoId).exec();

  return data;
}

module.exports = getProduct;
