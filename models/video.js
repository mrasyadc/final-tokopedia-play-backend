const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  products: [{ id: { type: Schema.Types.ObjectId, ref: "Product" } }],
});

module.exports = mongoose.model("Video", videoSchema);
