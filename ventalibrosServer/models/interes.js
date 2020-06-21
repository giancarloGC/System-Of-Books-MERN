const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const InteresSchame = Schema({
    idLibro: String,
    titulo: String,
    editorial: String,
    descripcion: String,
    idUsuarioD: String,
    idUsuarioI: String,
    nombreI: String,
    telefonoI: String
});

module.exports = mongoose.model("Interes", InteresSchame);