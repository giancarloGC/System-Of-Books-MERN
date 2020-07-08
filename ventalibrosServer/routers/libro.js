const express = require("express");
const multipart = require('connect-multiparty');
const LibroController = require("../controllers/libro");

//Middleware para subir la imagen a la carpeeta
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar"});

const api = express.Router();
api.post("/crearLibro", LibroController.registrarlibro);
api.put("/upload_img/:id", [md_upload_avatar], LibroController.uploadImg);
api.get("/getImgOfBook/:avatarName", LibroController.getImageBook); 
api.post("/getMisLibros", LibroController.obtenerMisLibros);
api.get("/getTodosLibros", LibroController.obtenerTodosLibros);
api.post("/getBookEdit", LibroController.getBookEdit);
api.post("/deleteLibro", LibroController.eliminarLibro);

module.exports = api;