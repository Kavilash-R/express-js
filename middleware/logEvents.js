const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
  const datetime = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
  const logItem = `${datetime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", "reqLog.txt"),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};
module.exports = logEvents;
