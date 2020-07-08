const fs = require('fs');
const path = require('path');
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
    libro.imagen = "";
    
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

const uploadImg = (req, res) => {
    const params = req.params;
    console.log(req.files);
    if(!req.files.avatar){
        res.status(500).send({ message: "La imagen no pudo llegar al servidor"});       
    }else{
        let filePath = req.files.avatar.path;
        let fileSplit = filePath.split("\\");
        let fileName = fileSplit[2];
        let extencionSplit = fileName.split(".");
        let fileExt = extencionSplit[1];

        const _id = params.id;
        Libro.findById({_id}, (err, bookData) => {
            if(err){
                res.status(500).send({ message: 'Error in the Server'});
            }else{
                if(!bookData){
                    res.status(404).send({ message: 'Book Not Found'});
                }else{
                    const bookfind = bookData;
                    bookfind.imagen = fileName;
                    console.log(fileName);
                    
                    Libro.findByIdAndUpdate({_id}, (bookfind), (err, bookWithImg) => {
                        if(err){
                            res.status(500).send({ message: 'Error in the Server'});
                        }else{
                            res.status(200).send({message: 'Al FIIIIINNN funciiono esta vaina ome... wujuuui, FUE GRACIAS A tI Dios'});
                        }
                    })
                }
            }
        })
    }
}

const getImageBook = (req, res) => {
    const idBook = req.params.avatarName;
    Libro.findById(({_id: idBook}), (err, dataBook) => {
        if(err){
            res.status(500).send({message: 'Error in the server'});
        }else{
            if(!dataBook){
                res.status(404).send({message: 'Book Not Found'});
            }else{
                let nameImagen = dataBook.imagen;
                if(!nameImagen){
                    nameImagen = "jeje.png";
                }else{
                    nameImagen = dataBook.imagen;
                }
                const filePath = "./uploads/avatar/" + nameImagen;
                fs.exists(filePath, exists => {
                    if(!exists){
                        res.status(404).send({message: 'el avatar not found'});
                    }else{
                        res.sendFile(path.resolve(filePath));
                    }
                });
            }
        }
    });   
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

const getBookEdit = (req, res) => {
    const params = req.body;
    const _id = params.idBook; 
    Libro.findById({_id}, (err, data) => {
        if(err){
            res.status(500).send({message: "Error en el Servidor"});
        }else{
            if(!data){
                res.status(404).send({message: "Libro no encontrado"});
            }else{
                res.status(200).send({ data });
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
    uploadImg,
    getImageBook,
    obtenerMisLibros,
    getBookEdit,
    eliminarLibro,
    obtenerTodosLibros 
};