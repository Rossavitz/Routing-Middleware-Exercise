const express = require("express");
const items = require("./fakeDb.js");
const router = express.Router();

let item1 = { name: "popsicle", price: 1.45 };
let item2 = { name: "cheerios", price: 3.4 };

items.push(item1, item2);

router.get("", function (req, res, next) {
  try {
    return res.json(items);
  } catch (e) {
    return next(e);
  }
});

//DOES NOT WORK....only shows original items list. Nothing added, no errors.
router.post("", function (req, res, next) {
  try {
    let newItem = { name: req.query.name, price: Number(req.query.price) };
    items.push(newItem);
    return res.json(newItem);
  } catch (e) {
    return next(e);
  }
});

router.get("/:name", function (req, res, next) {
  try {
    let getItem = items.find(({ name }) => name === req.params.name);
    return res.json(getItem);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:name", function (req, res, next) {
  try {
    let getItem = items.find(({ name }) => name === req.params.name);
    getItem.name = req.query.name;
    getItem.price = req.query.price;
    return res.json(getItem);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    let getItem = items.find(({ name }) => name === req.params.name);
    for (let i = 0; i < items.length; i++) {
      if (items[i] == getItem) {
        items.splice(i, 1);
      }
    }
    return res.json("Deleted");
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
