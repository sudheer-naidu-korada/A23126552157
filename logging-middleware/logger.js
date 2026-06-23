const axios = require("axios");

// Created a Logger and gave it the axios library for sending a post request... now, made the logging middleware according to the specified rules, added error-handling as well
const Log = async (stack, level, package_name, message) => {
  try {
    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      { stack, level, package: package_name, message },
      {
        headers: {
          Authorization: `Bearer ${process.env.LOG_TOKEN}`,
        },
      },
    );
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

module.exports = Log;
