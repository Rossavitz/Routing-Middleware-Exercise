const express = require("express");
const app = express();
const itemRoutes = require("./itemRoutes");
const ExpressError = require("./expressError");

app.use(express.json());
app.use("/items", itemRoutes);

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});

module.exports = app;
