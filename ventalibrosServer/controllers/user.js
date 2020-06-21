//const bcrypt = require("bcrypt-nodejs");
const { v4: uuidv4 } = require('uuid');
const jwt = require("../services/jwt");

const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10; //esta const es para que el bcrypt funcione


function registrarusuario(req, res){
    const user = new User();
    
    //El endpoint que yo le mando desde el potsman se guarda en req.body
    //debo guardarlo en un const

    const { nombre, cedula, sexo, telefono, email, password } = req.body;
    const idUnico = uuidv4();
    user.nombre = nombre;
    user.cedula = cedula;
    user.sexo = sexo;
    user.telefono = telefono;
    user.email = email.toLowerCase();

    if(!nombre || !cedula || !sexo || !telefono || !email || !password){
        res.status(404).send({message: "Asegurese de llenar todos los campos"});


    }else{
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                res.status(500).send({message: "Error al incriptarr el password"});
            } else{
                user.password = hash;

                user.save((err, userStored) => { //Aqui ya vamos a guardar el usuario a la BD
                    if(err){
                        res.status(500).send({message: "El usuario ya existte, no se ppuede crer uno con email igual "});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: "Error al crear el usuario"});
                        }else{
                            res.status(200).send({user: userStored}); //dentro de userstored esta guardado todo el objeti del usuario
                        }
                    }
                })


            }
        console.log(req.body);
        console.log("ell ide unico es: "+idUnico);
        
        });

    }
}

function iniciarSesion(req, res){
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    //Aqui me busca el email que yo le mande desde el form en mi tabla user de mongodb y bien sea si lo encuentra 
    // o no, me guarda eso en la variable userStored
    User.findOne({email}, (err, userStored) => { 
        if(err){
            res.status(500).send({message: "Error del servidor"});

        }else{ 
            if(!userStored){//le mando el usuario y lo busca en la BD, si NO lo encuentra me mostrara...
                res.status(404).send({message: "Usuario noo encontrado"});
            }else{
                //SIGNIFICA QUE SI LO ENCONTRO
                //aqui voy a comparar la contraseña ingresada en el form con la contraseña incriptada que ya esta en mi BD
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({message: "Error del servidor"});
                    }else if(!check){
                        res.status(404).send({message: "La contraseña es incorrecta."});
                    }else{//me muestra el accesstoken el cual contendra toda la informacion de ese usuario
                        res.status(200).send({
                            accessToken: jwt.createAccessToken(userStored),
                            refreshToken: jwt.createRefreshToken(userStored)
                        })
                    }
                });                
            }
        }        
    });
}

module.exports = {
    registrarusuario,
    iniciarSesion
};