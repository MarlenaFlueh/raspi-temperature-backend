const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const tempRoutes = require("./api/routes/temperatures");
const app = express();

mongoose.connect(
  "mongodb+srv://agent008:" +
    process.env.MONGO_ATLAS_PW +
    "@temperature-3ohyc.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/", tempRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
