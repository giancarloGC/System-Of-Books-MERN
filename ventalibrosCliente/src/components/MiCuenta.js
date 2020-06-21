import React from "react";
import "../scss/MiCuenta.scss";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "../api/auth";

function MiCuenta(){
    const accessToken = getAccessToken();
    const metaToken = jwtDecode(accessToken);
    const nombre = metaToken.nombre;
    const cedula = metaToken.cedula;
    const sexo = metaToken.sexo;
    const telefono = metaToken.telefono;
    const email = metaToken.email; 


    return(
        <div>
        <center><h1 class="titulo">Mi Cuenta</h1></center>
            <div className="container containers">
                <div className="labelsmicuenta">
                    <label>Nombre: </label>
                    <label>Cedula: </label>
                    <label>Sexo: </label>
                    <label>Teléfono: </label>
                    <label>Email: </label>
                </div>
                <div className="informacion">
                    <label>{nombre}</label>
                    <label>{cedula} </label>
                    <label>{sexo} </label>
                    <label>{telefono} </label>
                    <label>{email} </label>
                </div>                
            </div>

        </div>
    );
}
export default MiCuenta;
