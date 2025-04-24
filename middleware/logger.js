const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logName) => {
  const date$Time = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItems = `${date$Time}\t${uuid()}\t${message}\n`;
  console.log(logItems);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItems
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method}\n${req.path}`);
  next();
};

module.exports = { logEvents, logger };
