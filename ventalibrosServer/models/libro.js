const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LibroSchame = Schema({
    idUsuario: String,
    titulo: String,
    editorial: String,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model("Libro", LibroSchame);