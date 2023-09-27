//server.js
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());
let collection = null;
(async () => {
  const url = "mongodb://localhost:27017";
  const connection = await mongo.connect(url);
  const db = connection.db("mydb");
  collection = db.collection("news");
})();
let collectionF = null;
(async () => {
  const url = "mongodb://localhost:27017";
  const connection = await mongo.connect(url);
  const db = connection.db("mydb");
  collectionF = db.collection("favorite");
})();
app.get("/", async (req, res) => {
  res.json(await collection.find({}).toArray());
});
app.delete("/del", async (req, res) => {
  await collection.deleteMany({});
  await collectionF.deleteMany({});
  res.send("ok");
});
app.post("/appMONGO", async (req, res) => {
  try {
    const all = await collection.find({}).toArray();
    console.log(all.length);
    function Filterdata(data, filtos) {
      return data.map((element) => {
        const objFilt = {};
        Object.keys(element).forEach((k) => {
          if (filtos.includes(k)) {
            objFilt[k] = element[k];
          }
        });
        return objFilt;
      });
    }

    let arr = [
      "title",
      "description",
      "url",
      "author",
      "image",
      "category",
      "favorite",
    ];
    const mydata = Filterdata(req.body, arr);

    if (all.length <= 0) {
      await collection.insertMany(mydata);
      res.json("ok");
    } else {
      res.send(all);
    }
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
});
app.post("/rem", async (req, res) => {
  console.log("req.body", req.body);
  const all = await collectionF.find({}).toArray();
  console.log(all.length);
  if (all.length === 0) {
    await collectionF.insertMany(req.body);
    res.send("ok");
  } else {
    res.send("ok");
  }
});
app.get("/getfavorite", async (req, res) => {
  res.json(await collectionF.find({}).toArray());
});
app.put("/:id", async (req, res) => {
  let id = req.params.id;
  let idA = id;
  console.log(id);
  id = { _id: new ObjectId(id) };
  let catavaPut = await collection.find(id).toArray();
  // console.log(catavaPut);
  await collection.updateMany(
    { _id: { $eq: new ObjectId(idA) } },
    { $set: { favorite: true } }
  );
  console.log(catavaPut);
  res.send("ok");
});
app.get("/find/:id", async (req, res) => {
  // let idg = req.params.id;
  let id = req.params.id;
  let all = await collection.find({}).toArray();
  all = all.find((e) => {
    return e._id === new Object(id);
  });
  catava = all;
  console.log(catava);
  // console.log([catava._id, idg]);
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
