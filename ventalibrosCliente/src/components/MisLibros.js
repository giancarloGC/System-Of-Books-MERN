import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { PlusOutlined, BookOutlined, FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../scss/listaalllibros.scss";
import "../scss/MisLibros.scss";
import libro3 from "../../src/img/react.jpg";

import { getAccessToken } from "../api/auth";
import jwtDecode from "jwt-decode";
import { obtenerMisLibrosApi, eliminarLibroApi } from "../api/libro";
import { datosDelLibro } from "./EditarLibro";
import EditarLibro from "./EditarLibro";
import { LIBRO_EDITAR } from "../util/constants";
function MisLibros(){

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
        //datosDelLibro(libroEditar);
        //<EditarLibro libraa={libroEditar}/>
        localStorage.setItem(LIBRO_EDITAR, libroeditar);
        console.log("probandiiiiii LOCAL");

        setDatoss({...datoss, _id: libroeditar._id, 
            idUsuario: libroeditar.idUsuario, 
            titulo: libroeditar.titulo, 
            editorial: libroeditar.editorial, 
            descripcion: libroeditar.descripcion,
            imagen: libroeditar.imagen});

            console.log("IMPRIMIR USESTATE");
            const iss = datoss._id;
            console.log(iss);
            
            if(datoss._id){
               // const librre = ({datoss});
                //console.log("imprimiento libreeee");
                //console.log(librre);
                
                
                enviarDatosAComponenteEditar(datoss);//debo enviarle libroEditar
                       window.location.href = "/HomePage/Editarlibro";

            }
            
            console.log(datoss);
            
            
            

        //{<EditarLibro datos{libroEditar}/>};
       //window.location.href = "/HomePage/Editarlibro";

        //AQUI VOYYYYYY
        //const datos = {
           // titulo=
        //};
        //href="/HomePage/Editarlibro" 
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
                    <img alt="" src={libro3}/>
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


export default MisLibros;

export function enviarDatosAComponenteEditar(datoss){
    console.log("AL FIN TRAT DE ENVIAR AL COMPONENTEA");
    
    console.log(datoss);
    const libe = {
        _id: datoss._id,
        idUsuario: datoss.idUsuario, 
        titulo: datoss.titulo,
        editorial: datoss.editorial, 
        descripcion: datoss.descripcion,
        imagen: datoss.imagen
    }
    //window.location.href = "/HomePage/Editarlibro";
    return(
        //datosDelLibro(datos)
        <EditarLibro libe={libe}/>
    );
}

/*const datosLibroAEditar = (props) => {
    console.log(props);
    <EditarLibro datos={props}/>

    //AQUI VOYYYYYY
    //const datos = {
       // titulo=
    //};
    //href="/HomePage/Editarlibro" 
};*/