const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Db connected success"))
    .catch((error) => {
      console.log("Db connection error");
      process.exit(1);
    });
};
