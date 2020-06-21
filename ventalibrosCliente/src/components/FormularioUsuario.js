import React, { useState } from "react";
import { Form, Button, Input, notification } from "antd";
import { registrarUsuarioApi } from "../api/user"; //Aqui importo el metodo api que me enviara el endpoint
import "../scss/formularioUsuario.scss";

function FormularioUsuario (props) {

    const [inputs, setInputs] = useState({ //objeto con variables que me van a guardar lo que esscribe en cada input 
        nombre: "",
        cedula: "",
        sexo: "Seleccione",
        telefono: "",
        email: "",
        password: ""        
    });

    //Este metodo se debe llamar en el form como onChange{changeForm}
    const changeForm = (e) => { //En este metodo se capturara el value que haya en cada input.nombre, input.email etc etc etc
        setInputs({...inputs, [e.target.name]: e.target.value,});
    };

    //este metodo es el que finalmente luego de dar en el boton registrar me enviara los datos al backend
    const registrarUsuario = async (e) => { //este metodo se llama en el form como onSubmit{registrarUsuario}
        e.preventDefault(); //como el onSubmit recarga la pagina al dar click, este prevent default lo que hace es que no deja que se recargue 
        console.log(inputs);
        const nombreU = inputs.nombre;
        const cedulaU = inputs.cedula;
        const sexoU = inputs.sexo;
        const telefonoU = inputs.telefono;
        const emailU = inputs.email;
        const passwordU = inputs.password;

        if(!nombreU || !cedulaU || !sexoU || !telefonoU || !emailU || !passwordU){
            notification["error"]({message: "Llenar todos los campos es obligtorio"});
        }else{
            const result = await registrarUsuarioApi(inputs); //aqui se le envia a la funcion api de user.js toda la data o informacion

            if(!result.ok){
                notification["error"]({
                    message: result.message
                });
            }else{
                notification["success"]({
                    message: result.message
                });
                window.location.href = "/";
            }
        }
        
    };

    const vaciarCampos = () => {
        const vacio = "";
        const selecc = "Seleccione";
        document.getElementById("nom").value=vacio;
        document.getElementById("ced").value=vacio;
        document.getElementById("sex").value=selecc;
        document.getElementById("tel").value=vacio;
        document.getElementById("ema").value=vacio;
        document.getElementById("pas").value=vacio;
        setInputs({
            nombre: "",
            cedula: "",
            sexo: "Seleccione",
            telefono: "",
            email: "",
            password: ""        
        });
    };

    //Meetodo para que me quite el formualrio y me muestre el login, 
    const formlogin = (props) => { //por props se le paso el id de cada div
        console.log("di a cancelar"+props.idlogin);
        document.getElementById(props.idlogin).style.display="block";
        document.getElementById(props.idformuser).style.display="none";
    };

    return(

        <div class="container">
            <div class="row">
                <label class="tituloform" style={{marginBottom: "-30px"}}>Formulario de Usuario</label>
            </div>
            <Form onChange={changeForm} onSubmitCapture={registrarUsuario} >            
                <div className="row espacio">
                    <div class="col-md-3">
                        <p class="labels">Nombre:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="nombre" placeholder="Digite aquí su Nombre" id="nom"/>
                    </div>                
                </div>
                <div className="row espacio">
                    <div class="col-md-3">
                        <p class="labels">Cédula:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="cedula" placeholder="Digite aquí su Cédula" id="ced"/>
                    </div>                
                </div>
                <div className="row espacio">
                    <div class="col-md-3">
                        <p class="labels">Sexo:</p>
                    </div>
                    <div class="col-md-9">
                    <select name="sexo"  style={{ width: "240px"}} id="sex">
                        <option value="">Seleccione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>                   
                    </div>                
                </div>
                <div className="row espacio">
                    <div class="col-md-3">
                        <p class="labels">Teléfono:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="telefono" placeholder="Digite aquí su Teléfono" id="tel"/>
                    </div>                
                </div>
                <div className="row espacio">
                    <div class="col-md-3">
                        <p class="labels">Email:</p>
                    </div>
                    <div class="col-md-9">
                        <Input type="email" name="email" placeholder="Digite aquí su Email" id="ema"/>
                    </div>                
                </div>
                <div className="row espacio">
                    <div class="col-md-3">
                        <p class="labels">Password:</p>
                    </div>
                    <div class="col-md-9">
                        <Input type="password" name="password" placeholder="Digite aquí su Password" id="pas" required=""/>
                    </div>                
                </div>
                <div className="row espacio">
                <Button  htmlType="submit" className="btnregistrar2">
                    Crear Cuenta
                </Button>                  
                <Button type="danger" onClick={() => formlogin(props)} className="btnCancelar">
                    Cancelar
                </Button>                
                </div>  
            </Form>
                                                          
        </div>


    );
}

export default FormularioUsuario;


