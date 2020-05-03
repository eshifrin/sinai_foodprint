const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

const ApiRouter = require("./api-router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", ApiRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
