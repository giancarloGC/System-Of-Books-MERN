const jwt = require("../services/jwt");

const Interes = require("../models/interes");


function registrarInteres(req, res){
    const interes = new Interes();
    //El endpoint que yo le mando desde el potsman se guarda en req.body
    //debo guardarlo en un const

    const { idLibro, titulo, editorial, descripcion, idUsuarioD, idUsuarioI, nombreI, telefonoI } = req.body;
    interes.idLibro = idLibro;
    interes.titulo = titulo;
    interes.editorial = editorial;
    interes.descripcion = descripcion;
    interes.idUsuarioD = idUsuarioD;
    interes.idUsuarioI = idUsuarioI;
    interes.nombreI = nombreI;
    interes.telefonoI = telefonoI;

    if(!titulo || !editorial || !descripcion || !nombreI || !telefonoI){
        res.status(404).send({message: "Asegurese de llenar todos los campos"});


    }else{
        interes.save((err, userStored) => { //Aqui ya vamos a guardar el interes a la BD
            if(err){
                res.status(500).send({message: "El interes ya existte, no se ppuede crer uno con  igual "});
            }else{
                if(!userStored){
                    res.status(404).send({message: "Error al crear el Interes"});
                }else{
                    res.status(200).send({message: "conseguido"}); //dentro de userstored esta guardado todo el objeti del usuario
                }
            }
        })


        console.log(req.body);
        

    }
}

module.exports = {
    registrarInteres 
};