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
      imageURL:
        "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/9/13/0e1eba0b-4ebf-4a7c-a15d-826433bc792d.png",
      price: 11999000,
    },
    {
      title: "Xbox Series S Console - XBOX Series S",
      productURL:
        "https://www.tokopedia.com/nextgameofficial/xbox-series-s-console-xbox-series-s?extParam=whid%3D6586",
      imageURL:
        "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/13/0b8b0d00-a130-4fdc-9f74-be05bfdceb2a.png",
      price: 3999000,
    },
    {
      title: "PS5 PS 5 Sony Playstation 5 Play Station 5 ( Disc Version )",
      productURL:
        "https://www.tokopedia.com/libertygame/ps5-ps-5-sony-playstation-5-play-station-5-disc-version-fifa23-jpn?extParam=whid%3D8806%26cmp%3D1%26src%3Dwishlist",
      imageURL:
        "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/8/15/0c9a501c-e7b4-4123-b8c5-0e659d4a5997.jpg",
      price: 7999000,
    },
    {
      title: "Sony PS5 PlayStation 5 Console Mesin PS - Digital Indo",
      productURL:
        "https://www.tokopedia.com/nextgameofficial/sony-ps5-playstation-5-console-mesin-ps-digital-indo?extParam=ivf%3Dfalse%26src%3Dsearch",
      imageURL:
        "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/6/2/6067be73-d4eb-4046-a5f6-188615fc95d9.png",
      price: 7999000,
    },
    {
      title:
        "Stick Xbox Series X S XBOX One Wireless Controller Hitam Carbon Black",
      productURL:
        "https://www.tokopedia.com/butikgames/stick-xbox-series-x-s-xbox-one-wireless-controller-hitam-carbon-black?extParam=ivf%3Dfalse%26src%3Dsearch",
      imageURL:
        "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/8/10/366a8131-28cf-4aea-8131-3ae0b2c9aa00.jpg",
      price: 770000,
    },
    {
      title: "XBOX Series S - Console Only",
      productURL:
        "https://www.tokopedia.com/psenterprise/xbox-series-s-console-only?extParam=ivf%3Dfalse%26src%3Dsearch",
      imageURL:
        "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/8/30/e29c5093-24b5-4371-9ae4-a3ceedbc861d.jpg",
      price: 3999000,
    },
  ]);
}

async function videoSeeder() {
  await Video.insertMany([
    {
      title: "The One Monitor Setup - Macbook, PS5 and PC",
      url: "https://www.youtube.com/watch?v=uZzW637rzyA&pp=ygURbWFjYm9vayBwczUgc2V0dXA%3D",
      products: await Product.find({
        title: { $regex: new RegExp("PS5") },
      })
        .exec()
        .then((data) => {
          let dataWillBeInserted = [];
          data.map((data) => dataWillBeInserted.push(data._id));
          return [...dataWillBeInserted];
        }),
    },
    {
      title:
        "My Minimal Productivity Mac Desk Setup (for students, office work, developers, and more!)",
      url: "https://www.youtube.com/watch?v=nxTHQfOG52o",
      products: await Product.find({
        title: { $regex: new RegExp("MACBOOK") },
      })
        .exec()
        .then((data) => {
          let dataWillBeInserted = [];
          data.map((data) => dataWillBeInserted.push(data._id));
          return [...dataWillBeInserted];
        }),
    },
    {
      title: "STOP Buying games if you have an XBOX Series S",
      url: "https://www.youtube.com/watch?v=HnGrCCAAeXA",
      products: await Product.find({
        title: { $regex: new RegExp("XBOX") },
      })
        .exec()
        .then((data) => {
          let dataWillBeInserted = [];
          data.map((data) => dataWillBeInserted.push(data._id));
          return [...dataWillBeInserted];
        }),
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
