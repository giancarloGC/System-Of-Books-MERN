import React, { useState, useEffect } from "react";
import "../scss/listaalllibros.scss";
import {Button, notification} from "antd";
import { LikeOutlined, BookOutlined, FileTextOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';

import { obtenerTodosLibrosApi, getAvatarApi } from "../api/libro";
import { registrarLibroInteresApi } from "../api/interes";
import { getAccessToken } from "../api/auth";
import jwtDecode from "jwt-decode";
//import noAvatar from ""

function ListaAllLibros(){
    const [libros, setLibros] = useState([]);
    
    useEffect(() => {
        obtenerTodosLibrosApi().then(response => {
            console.log(response); //Aqui en rsponse tengo TODOS los libros dentro de un array
            setLibros(response.libros); //este .libros es el vector que viene del backend          
        });
    }, []);

    console.log("mostrando todos los libros");
    console.log(libros);
    
    const [ libInteresante, setLibInteresante ] = useState({        
        idLibro: "",
        titulo: "",
        editorial: "",
        descripcion: "",
        idUsuarioD: "",
        idUsuarioI: "",
        nombreI: "",
        telefonoI: ""
    });
    
    const meInteresa = async (props) => {
        console.log("estoy mostrando datos del libro");
        console.log(props);          
        console.log("creando obj");
        
        const accessToken = getAccessToken();
        const userCuenta = jwtDecode(accessToken);
        console.log(userCuenta);
        
        const datoslib = libros.find(item => {
            return item._id === props;
        })
        setLibInteresante({...libInteresante, idLibro: datoslib._id,
            titulo: datoslib.titulo,
            editorial: datoslib.editorial,
            descripcion: datoslib.descripcion,
            idUsuarioD: datoslib.idUsuario,
            idUsuarioI: userCuenta.id,
            nombreI: userCuenta.nombre,
            telefonoI: userCuenta.telefono
        });
        console.log(libInteresante);
        
        const result = await registrarLibroInteresApi(libInteresante);
        if(result.message){
            notification["success"]({message: result.message});
        }else{


            notification["success"]({
                message: "Interes Registrado Correctamente"
            });
            window.location.href = "/HomePage";
            window.location.href = "/HomePage";

        }
    };
    
    return(
        <div>               
            <center><h1 class="titulo">Listado de Libros</h1></center>
            <div className="container">
                {libros.map((item) => (
                <div class="card">
                    <CargarImagen idBook={item._id}/>
                    <h3>{item.titulo}</h3>
                        <div className="texto">
                            <h4 class="titulolibroo">{item.titulo}</h4>
                            <h5 className="editorial"><BookOutlined /> Editorial: {item.editorial}</h5> 
                            <h5 className="descripcion"> <FileTextOutlined /> 
                                {item.descripcion} 
                            </h5>
                
                            <Button type="primary" className="btnMeInteresa" onClick={() => meInteresa(item._id)}>
                                Me Interesa <LikeOutlined />
                            </Button>                            
                        </div>
                </div>
                ))}                                                                              
            </div>
        </div>
    );
}
export default ListaAllLibros;

function CargarImagen (props) {
    const { idBook } = props;
    const [ imagen, setImagen ] = useState(null);
    useEffect(() => {
        getAvatarApi(idBook).then(response => {
            setImagen(response);
        })
    },[]);

    return(
        <img alt="" src={imagen}/>
    );
}