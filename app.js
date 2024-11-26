const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require('dotenv').config();

const app = express();
const { PORT = 3001 } = process.env;

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

app.use(requestLogger);
app.use("/", indexRouter);

app.use(errorLogger);

app.use(errors());

app.use("/", errorHandler);


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
