const { connect } = require("mongoose");

const { MONGO_URI } = process.env;
function databaseConnection() {
  connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex : true
  })
    .then(() => console.log("Successfully connected to the database"))
    .catch((error) => console.log(error));
}

module.exports = databaseConnection;
