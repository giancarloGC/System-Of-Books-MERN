const express = require("express");
const LibroController = require("../controllers/libro");

const api = express.Router();
api.post("/crearLibro", LibroController.registrarlibro);
api.post("/getMisLibros", LibroController.obtenerMisLibros);
api.get("/getTodosLibros", LibroController.obtenerTodosLibros);
api.post("/deleteLibro", LibroController.eliminarLibro);


module.exports = api;