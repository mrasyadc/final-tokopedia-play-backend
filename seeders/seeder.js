require("dotenv").config();
const Product = require("../models/product");
const Comment = require("../models/comment");
const Video = require("../models/video");
const mongoose = require("mongoose");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", async () => {
  console.log("Database connected");
  await cleanUpDB();
  await seedDB();
  mongoose.disconnect();
  console.log("seeder completed");
  process.exit();
});

async function cleanUpDB() {
  await Video.deleteMany({});
  await Product.deleteMany({});
  await Comment.deleteMany({});
  console.log("cleaning up database...");
}

async function seedDB() {
  await productSeeder();
  await videoSeeder();
  await commentSeeder();
  console.log("seeding database...");
}

async function productSeeder() {
  await Product.insertMany([
    {
      title: "Apple MACBOOK AIR 2020 M1 CHIP 256GB RAM 8GB Garansi IBOX",
      productURL:
        "https://www.tokopedia.com/tokobaru-s/apple-macbook-air-2020-m1-chip-256gb-ram-8gb-garansi-ibox-silver?extParam=whid%3D7190022%26cmp%3D1%26src%3Dwishlist",
      price: 11999000,
    },
    {
      title: "Xbox Series S Console - XBOX Series S",
      productURL:
        "https://www.tokopedia.com/nextgameofficial/xbox-series-s-console-xbox-series-s?extParam=whid%3D6586",
      price: 3999000,
    },
    {
      title: "PS5 PS 5 Sony Playstation 5 Play Station 5 ( Disc Version )",
      productURL:
        "https://www.tokopedia.com/libertygame/ps5-ps-5-sony-playstation-5-play-station-5-disc-version-fifa23-jpn?extParam=whid%3D8806%26cmp%3D1%26src%3Dwishlist",
      price: 7999000,
    },
  ]);
}

async function videoSeeder() {
  await Video.insertMany([
    {
      title: "The One Monitor Setup - Macbook, PS5 and PC",
      url: "https://www.youtube.com/watch?v=uZzW637rzyA&pp=ygURbWFjYm9vayBwczUgc2V0dXA%3D",
      products: [
        await Product.findOne({
          title: { $regex: new RegExp("PS5") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
    {
      title:
        "My Minimal Productivity Mac Desk Setup (for students, office work, developers, and more!)",
      url: "https://www.youtube.com/watch?v=nxTHQfOG52o",
      products: [
        await Product.findOne({
          title: { $regex: new RegExp("MACBOOK") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
    {
      title: "STOP Buying games if you have an XBOX Series S",
      url: "https://www.youtube.com/watch?v=HnGrCCAAeXA",
      products: [
        await Product.findOne({
          title: { $regex: new RegExp("XBOX") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
  ]);
}

async function commentSeeder() {
  await Comment.insertMany([
    {
      username: "studywithme444",
      comment:
        "Lovely video Oliur.  Love the idea of a one cable setup for my macbook, would make cable management much easier! The monitor arm is gorgeous as well, especially for saving space. Probably something I will have to purchase in the near future.",
      videoId: [
        await Video.findOne({
          title: { $regex: new RegExp("Macbook, PS5") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
    {
      username: "muhtasimmunir1830",
      comment:
        "This is it guys. This is the benchmark for every setup going forward. Absolutely gorgeous.",
      videoId: [
        await Video.findOne({
          title: { $regex: new RegExp("Macbook, PS5") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
    {
      username: "oluwaseunus",
      comment:
        "That is a really nice setup tbh. And the monitor being able to handle both work and play is just the cherry on top.",
      videoId: [
        await Video.findOne({
          title: { $regex: new RegExp("Macbook, PS5") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
    {
      username: "veoquenoesunproblema",
      comment:
        "You have shown one of the best videos of office design, not a 3K chair, a 200 mouse pad with no reason, a simple a cheap laptop stand and not a aluminum ultra aerospace ultra special without reason, just simple stuff that most of the people can afford and it looks good. Cheers and thanks.",
      videoId: [
        await Video.findOne({
          title: { $regex: new RegExp("for students") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
    {
      username: "cleverchimp499",
      comment:
        "I got a series s. Gaming is in a weird place at the moment most of the games are really broken and bland. I can definitely see game pass taking over and all games being geared towards micro transactions in a big way. But I honestly don't know where online gaming is heading because it's not looking good at the moment when you look at the numbers",
      videoId: [
        await Video.findOne({
          title: { $regex: new RegExp("have an XBOX Series") },
        })
          .exec()
          .then((data) => data._id),
      ],
    },
  ]);
}
