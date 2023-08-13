const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  productURL: {
    required: true,
    type: String,
  },
  imageURL: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);
