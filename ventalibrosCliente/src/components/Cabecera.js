import React from "react";
import "../scss/cabeceraa.scss";
import Logo from "../../src/img/buholibro.png";
import "../scss/inicioSesion.scss";
import Notificaciones from "../../src/img/notif.PNG";

import { getAccessToken } from "../api/auth";
import jwtDecode from "jwt-decode";

function Cabecera(){

const lol = getAccessToken();
const nom = jwtDecode(lol);
const nombre = nom.nombre;
    return(
        <div>
            <header>
            <div class="row cabecera">
                <div class="col-md-1">
                </div>             
                <div class="col-md-1">
                    <center><a href="/HomePage"><img class="imagenlogo"alt="" src={Logo}/></a></center>
                </div>
                <div class="col-md-6 title">
                    <p>Bienvenido {nombre}</p>
                </div>
                <div class="col-md-4">
                    <nav class="menu">
                        <ul>
                            <li>
                                Menú
                                <ul>
                                <a href="/HomePage/Micuenta"><li>Mi Cuenta</li></a>
                                    <a href="/HomePage/Mislibros"><li>Mis Libros</li></a>
                                    <li>Interesantes</li>
                                </ul>
                            </li>
                            <li>
                                Notificaciones
                                <ul>
                                    <a href>
                                        <img className="notificaciones" alt="" src={Notificaciones}/>
                                        <div class="numero">
                                            <center><h5>24</h5></center>
                                        </div>
                                    </a>
                                    </ul>
                            </li>
                            <li>
                                <a href="/">Cerrar Sesión</a>
                            </li>                            
                        </ul>
                    </nav>
                </div>
                                                                          
            </div>
            </header>
        </div>
    );
}
export default Cabecera;