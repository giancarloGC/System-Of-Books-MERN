const express = require("express");
const InteresController = require("../controllers/interes");
const api = express.Router();
api.post("/crearLibroInteres", InteresController.registrarInteres);


module.exports = api;