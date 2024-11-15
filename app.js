const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(helmet());

const indexRouter = require("./routes/index");

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("connected to DB");
  },
  (e) => console.log("DB error", e)
);

app.use(express.json());

app.use("/", indexRouter);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
