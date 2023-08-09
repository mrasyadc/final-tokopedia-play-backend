const Video = require("../models/video");

async function getVideos() {
  return await Video.find({});
}

module.exports = getVideos;
