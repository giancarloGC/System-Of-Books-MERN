import React, {useState} from "react";
import "../scss/MiCuenta.scss";
import { Form, Button, Input} from "antd";
import "../scss/AgregarLibro.scss";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "../api/auth";
import { enviarDatosAComponenteEditar } from "./MisLibros";

import { LIBRO_EDITAR } from "../util/constants";

export function datosDelLibro({libe}){
    console.log("etoy en editrSEÑORAS Y EÑORES");
    /*const [libroo, setLibroo] = useState({});
    setLibroo(...libroo)*/
    console.log("primer metodo EDITAR");

    console.log(libe);
    //EditarLibro(datos);
};

function EditarLibro({libe}){
    /*const accessToken = getAccessToken();
    const metaToken = jwtDecode(accessToken);
    const idUsuario = metaToken.id;*/
    console.log("aqui trato de ascar PROPSSS");
    console.log(libe);
    
    //const { datos } = props;
    //const libroeditar = localStorage.getItem(LIBRO_EDITAR);
    //console.log("Probando LOCALSTORAGEEE");
    //console.log(libroeditar);
    
    /*const [ datoss, setDatoss ] = useState({
        id: "",
        idUsuario: "",
        titulo: "",
        editorial: "",
        descripcion: "",
        imagen: ""
    })
    setDatoss({...datoss, id: props._id, idUsuario: props.idUsuario, titulo: props.titulo, editorial: props.editorial, descripcion: props.descripcion, imagen: props.imagen});
*/

console.log("estoy en EDITARRR");
console.log(libe);




    
    return(
        <div>
        <center><h1 class="titulo">Editar Libro</h1></center>
            <div className="container formulariolibro">
            <Form >            
                <div className="row espacionombre">
                    <div class="col-md-3">
                        <p class="labelslibro">Título:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="titulo" value="bb" id="titulo"/>
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
                        <Input type="file" name="imagen" id="imagen"/>
                    </div>                
                </div>                                              
                <div className="row espacio">
                <Button type="primary" htmlType="submit" className="btnregistrar2">
                    Actualizar
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
export default EditarLibro;