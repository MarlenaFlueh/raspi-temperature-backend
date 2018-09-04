const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const tempRoutes = require("./api/routes/temperatures");
const app = express();

mongoose.connect(
  "mongodb+srv://agent007:agent007@temperature-3ohyc.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, DELETE, POST, GET, PATCH");
    // check if status code and empty object is necessary
    return res.status(200).json({});
  }
  next();
});

app.use("/temperatures", tempRoutes);

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
