import React, { useState } from "react";
import "../scss/MiCuenta.scss";
import { Form, Button, Input, notification} from "antd";
import "../scss/AgregarLibro.scss";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "../api/auth";
import { registrarLibroApi } from "../api/libro";

function AgregarLibro(){
    const accessToken = getAccessToken();
    const metaToken = jwtDecode(accessToken);
    const idUsuario = metaToken.id;

    const [ libro, setLibro] = useState({
        idUsuario: idUsuario,
        titulo: "",
        editorial: "",
        descripcion: "",
        imagen: ""
    });

    const changeForm = (e) => { //En este metodo se capturara el value que haya en cada input.nombre, input.email etc etc etc
        setLibro({...libro, [e.target.name]: e.target.value,});
    };

    const registrarLibro = async (e) => { //este metodo se llama en el form como onSubmit{registrarUsuario}
        e.preventDefault(); //como el onSubmit recarga la pagina al dar click, este prevent default lo que hace es que no deja que se recargue 
        console.log(libro);
        const idUsuario = libro.idUsuario;
        const titulo = libro.titulo;
        const editorial = libro.editorial;
        const descripcion = libro.descripcion;
        const imagen = libro.imagen;

        if(!idUsuario || !titulo || !editorial || !descripcion || !imagen){
            notification["error"]({message: "Llenar todos los campos es obligtorio"});
        }else{
            const result = await registrarLibroApi(libro); //aqui se le envia a la funcion api de user.js toda la data o informacion

            if(!result.ok){
                notification["error"]({
                    message: result.message
                });
            }else{
                notification["success"]({
                    message: result.message
                });
                window.location.href = "/HomePage/Mislibros";
            }
        }
        
    };    

    return(
        <div>
        <center><h1 class="titulo">Formulario de Libro</h1></center>
            <div className="container formulariolibro">
            <Form onChange={changeForm} onSubmitCapture={registrarLibro}>            
                <div className="row espacionombre">
                    <div class="col-md-3">
                        <p class="labelslibro">Título:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="titulo" placeholder="Digite aquí su el Título" id="titulo" required/>
                    </div>                
                </div> 
                <div className="row espaciolibro">
                    <div class="col-md-3">
                        <p class="labelslibro">Editorial:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="editorial" placeholder="Digite aquí la Editorial" id="editorial" required/>
                    </div>                
                </div>    
                <div className="row espaciolibro">
                    <div class="col-md-3">
                        <p class="labelslibro">Descripción:</p>
                    </div>
                    <div class="col-md-9">
                        <Input.TextArea name="descripcion" placeholder="Descripción del Libro" id="descripcion" required/>
                    </div>                
                </div>   
                <div className="row espaciolibro">
                    <div class="col-md-3">
                        <p class="labelslibro">Imagen:</p>
                    </div>
                    <div class="col-md-9">
                        <Input type="file" name="imagen" id="imagen" required/>
                    </div>                
                </div>                                              
                <div className="row espacio">
                <Button type="primary" htmlType="submit" className="btnregistrar2">
                    Agregar Libro
                </Button>                  
                <Button type="danger" className="btnCancelar" href="/HomePage/Mislibros">
                    Cancelar
                </Button>                
                </div>  
            </Form>               
             
            </div>

        </div>
    );
}
export default AgregarLibro;