const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const imgSchema = require("./model/imgModel.js");

const app = express();
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit according to your need
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "uploads"));
//   },
//   filename: (req, file, cb) => {
//     console.log(file.mimetype)
//     cb(null,file.originalname);
//   },
// });

// const uploads = multer({ storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});
app.get("/images", async (req, res) => {
  let images = await imgSchema.find();

  res.json({ images }); // Make sure `images` is an array of strings
});

app.post("/upload", async (req, res) => {
  let newImage = await imgSchema.create({
    image: req.body.image,
  });
  await newImage.save();
  res.json({
    Status: "success",
    Image: req.body,
  });
});

// Include more logs for debugging


mongoose
  .connect(
    "mongodb+srv://nandhuv139:0JAqpK6kYG5ptUXS@cluster0.qrzv2.mongodb.net/"
  )
  .then(() => {
    try {
      app.listen(8080, () => {
        console.log("Server is listening on port 8080");
      });
    } catch (err) {
      console.error("Error starting the server:", err.message);
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });


