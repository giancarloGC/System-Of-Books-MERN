const jwt = require("../services/jwt");

const Libro = require("../models/libro");


function registrarlibro(req, res){
    const libro = new Libro();
    
    //El endpoint que yo le mando desde el potsman se guarda en req.body
    //debo guardarlo en un const

    const { idUsuario, titulo, editorial, descripcion, imagen } = req.body;
    libro.idUsuario = idUsuario;
    libro.titulo = titulo;
    libro.editorial = editorial;
    libro.descripcion = descripcion;
    libro.imagen = imagen;
    
    if(!titulo || !editorial || !descripcion || !imagen){
        res.status(404).send({message: "Asegurese de llenar todos los campos form LIBRO"});
    }else{
        libro.save((err, userStored) => { //Aqui ya vamos a guardar el libro a la BD
            if(err){
                res.status(500).send({message: "El libro ya existte, no se ppuede crer uno con email igual "});
            }else{
                if(!userStored){
                    res.status(404).send({message: "Error al crear el libro"});
                }else{
                    res.status(200).send({libro: userStored}); //dentro de userstored esta guardado todo el objeti del usuario
                }
            }
        })
        console.log(req.body);
    }
}

function obtenerMisLibros(req, res){
    const params = req.body;
    const idUsuario = params.id;

    Libro.find({idUsuario}, (err, userStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!userStored){
                res.status(404).send({message: "Libros del usuario no encontrados"});
            }else{
                res.status(200).send({userStored});
            }
        }
    });   
}

function eliminarLibro(req, res){
    const params = req.body;
    const _id = params._id;

    Libro.findByIdAndRemove({_id}, (err, userStored) => {
        if(err){
            res.status(500).send({message: "Error en el Servidor"});
        }else{
            if(!userStored){
                res.status(404).send({message: "Libro no encontrado"});
            }else{
                res.status(200).send({user: userStored});
            }
        }
    });   
}

//Este metodo me traera TTODOS los libros regitrados
function obtenerTodosLibros(req, res){
    Libro.find().then(libros => {
        if(!libros){
            res.status(404).send({message: "No hay ningun libro registrado"});
        }else{
            res.status(202).send({ libros });
        }
    })    
}
 
module.exports = {
    registrarlibro,
    obtenerMisLibros,
    eliminarLibro,
    obtenerTodosLibros 
};