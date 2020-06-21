const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const Schema = mongoose.Schema;
const UserSchame = Schema({
    //Me falta el id... que se autogenere.... puede ser con el paquete joi = require('@hapi/joi
    //id: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    nombre: String,
    cedula: String,
    sexo: String,
    telefono: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

module.exports = mongoose.model("User", UserSchame);