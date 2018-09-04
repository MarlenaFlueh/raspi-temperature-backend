const express = require("express");

const Temperature = require("../model/temperature");

const router = express.Router();

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
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
