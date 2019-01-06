const mongoose = require("mongoose");

const config = require("./config");

mongoose.Promise = global.Promise;

const options = {
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  useNewUrlParser: true
};

const connectWithRetry = () => {
  // eslint-disable-next-line no-console
  console.log("MongoDB connection with retry");
  mongoose
    .connect(
      config.mongoURI,
      options
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("MongoDB is connected");
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
      setTimeout(connectWithRetry, 5000);
    });
};

mongoose.connection.on("connected", () => {
  // eslint-disable-next-line no-console
  console.log("MongoDB is connected");
});

const connect = () => {
  connectWithRetry();
};

module.exports = { connect };
