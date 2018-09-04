const mongoose = require("mongoose");

const temperatureSchema = mongoose.Schema(
  {
    temp: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Temperature", temperatureSchema);
