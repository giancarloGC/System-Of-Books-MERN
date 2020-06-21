const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require('./config');

const userRoutes = require("./routers/user");
const libroRoutes = require("./routers/libro");
const interesRoutes = require("./routers/interes");


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, libroRoutes);
app.use(`/api/${API_VERSION}`, interesRoutes);

module.exports = app;