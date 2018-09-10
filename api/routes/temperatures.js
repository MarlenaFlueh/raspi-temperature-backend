const express = require("express");
require("dotenv").config();
const Twit = require("twit");

const Temperature = require("../model/temperature");
const tweeds = require("../../utils/tweeds");

const router = express.Router();
const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

router.delete("/", async (req, res, next) => {
  try {
    const temperature = await Temperature.remove();
    res.json(temperature);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const temperatures = await Temperature.find({});
    res.json(temperatures);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Temperature.create({ temp: req.body.temp });
    res.json({
      message: "success created!",
      createdTemperatures: {
        temp: result.temp
      }
    });
    T.post(
      "statuses/update",
      {
        status: `${tweeds(result.temp)[Math.round(Math.random() * 10)]}`
      },
      (error, data, response) => {
        console.log(data);
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
