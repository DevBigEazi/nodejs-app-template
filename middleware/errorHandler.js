const { stack } = require("../routes/root");
const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, "errorLog.txt");
  console.error(stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
