const express = require("express");
require("dotenv").config();
const Twit = require("twit");

const Temperature = require("../model/temperature");

const router = express.Router();
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000
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
        status: `Temperatures are around ${
          result.temp
        } degrees celsius in Lüneburg, Germany.`
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
