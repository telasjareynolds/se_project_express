const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB");
  },
  (e) => console.log("DB error", e)
);

app.use(express.json());

const authMiddleware = (req, res, next) => {
  req.user = {
    _id: "672fcf0e8e1c364372526e91",
  };
  next();
};
app.use("/", authMiddleware, indexRouter);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
