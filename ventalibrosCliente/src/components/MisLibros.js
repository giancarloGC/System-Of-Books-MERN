import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { PlusOutlined, BookOutlined, FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../scss/listaalllibros.scss";
import "../scss/MisLibros.scss";
import libro3 from "../../src/img/react.jpg";

import { getAccessToken } from "../api/auth";
import jwtDecode from "jwt-decode";
import { obtenerMisLibrosApi, eliminarLibroApi, getAvatarApi } from "../api/libro";
import { datosDelLibro } from "./EditarLibro";
import EditarLibro from "./EditarLibro";
import { LIBRO_EDITAR } from "../util/constants";
import noAvatar from "./../../src/img/noAvatar.png";

export default function MisLibros(){

    const token = getAccessToken();
    const metaToken = jwtDecode(token);
    console.log(metaToken);
    
    //console.log("estoy en mis libros" + metaToken);
    const [libros, setLibros] = useState([]);

    console.log(libros);
    useEffect(() => {//debo pasarle es el objeto de metaToken, y no variables como id o nombre...
        obtenerMisLibrosApi(metaToken).then(response => {           
            setLibros(response.userStored);
        });
    }, []);



    const [ datoss, setDatoss ] = useState({
        _id: "",
        idUsuario: "",
        titulo: "",
        editorial: "",
        descripcion: "",
        imagen: ""
    });
    const datosLibroAEditar = (props) => {
        console.log(props);//Aqui ya tengo el id del libro
        const libroeditar = libros.find(item => {
            return item._id === props;
        })
        console.log(libroeditar);
        localStorage.setItem(LIBRO_EDITAR, libroeditar);

        setDatoss({...datoss, _id: libroeditar._id, 
            idUsuario: libroeditar.idUsuario, 
            titulo: libroeditar.titulo, 
            editorial: libroeditar.editorial, 
            descripcion: libroeditar.descripcion,
            imagen: libroeditar.imagen});

            console.log("IMPRIMIR USESTATE");
            const iss = datoss._id;
            console.log(iss);

            window.location.href = `/HomePage/Editarlibro/${props}`;
            //href={`/HomePage/Editarlibro/${item._id}`}
    };

    const [ libEliminar, setLibEliminar ] = useState({
        _id: ""
    });
    
    const eliminarLibro = async (props) => {
        console.log("estoy ELIMIANDO");
        
        console.log(props);

        
        
        console.log("creando obj");
      

        setLibEliminar({_id: props});
        console.log(libEliminar);
        const result = await eliminarLibroApi(libEliminar);
        
        
        if(result.message){
            notification["success"]({message: result.message});
        }else{


            notification["success"]({
                message: "Libro Eliminado Correctamente"
            });
            window.location.href = "/HomePage/MisLibros";
            window.location.href = "/HomePage/MisLibros";

        }


    };

    return(
        <div>
            <center><h1 class="titulo">Mis Libros</h1></center>
            <center>
                <Button type="primary" className="btnAgregar" href="/HomePage/Agregarlibro">
                    Agregar Libro<PlusOutlined />
                </Button>                
            </center>
                <div className="container">
                    {libros.map((item) => (
                    <div class="card">
                        <CargarImagen _id={item._id} />
                    <h3>{item.titulo}</h3>
                        <div className="texto">
                            <h4 class="titulolibroo">{item.titulo}</h4>
                            <h5 className="editorial"><BookOutlined /> Editorial: {item.editorial}</h5> 
                            <h5 className="descripcion"> <FileTextOutlined /> 
                                {item.descripcion} 
                            </h5>
                            <div className="opciones">
                                <Button type="primary" className="btnopcion" onClick={() => datosLibroAEditar(item._id)}>
                                    <EditOutlined />
                                </Button>  
                                <Button type="danger" className="btnopcion" onClick={() => eliminarLibro(item._id)}>
                                    <DeleteOutlined />
                                </Button> 
                            </div>                                                                                     
                        </div>
                </div>
                ))}                                                               
            </div>            
        </div>
    );
}


function CargarImagen (props){
    const { _id } = props;
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        getAvatarApi(_id).then(response => {
            setAvatar(response);
        });
    }, []);

    return (
         <img alt="" src={avatar} />
    );
}