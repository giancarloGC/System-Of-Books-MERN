import React, { useState } from "react";
import "../scss/inicioSesion.scss";
import "../scss/formularioUsuario.scss";
import "bootstrap/dist/css/bootstrap.css";
import buho from "../../src/img/buholibro.png";

import FormularioUsuario from "../components/FormularioUsuario.js";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Button, Input, notification } from 'antd';

import { iniciarSesionApi } from "../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../util/constants";

function InicioSesion (){

    window.onload = function() {
        document.getElementById("login").style.display="block";
        document.getElementById("formularioUsuario").style.display="none";

    };
    
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = e => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });        
    };

    const login = async e => {
        e.preventDefault();

        const result = await iniciarSesionApi(inputs); //sin el await me devuelve una promesa asi que se coloca async arriba y await 
        if(result.message){
            notification["error"]({message: result.message});
        }else{
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification["success"]({
                message: "Login Correcto"
            });
            window.location.href = "/HomePage";
           
        }
    };
    
    const formularioRegistrarme = () =>{
        document.getElementById("formularioUsuario").style.display="block";
        document.getElementById("login").style.display="none";
    } 

    return(
        <div class="general">
            <label class="titulois">Sistema de Libros</label>

            <div class="login" id="login">
                <div class="logo">
                    <img alt="" src={buho}/>
                </div>
                <div class="formulario">
                    <Form name="basic" onChange={changeForm} onSubmitCapture={login}>
      
                        <Form.Item name="username">                    
                            <UserOutlined className="logoUser"/>
                            <Input className="cajaUser" placeholder="Digite aquí su nombre" name="email" required/>
                        </Form.Item>

                        <Form.Item name="password">                    
                            <LockOutlined className="logoPassword"/>
                            <Input.Password className="cajaPassword" placeholder="Digite aquí su Password" name="password" required/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="btnIngresar">
                            Ingresar
                            </Button>
                            <Button type="primary" onClick={() => formularioRegistrarme()} className="btnregistrar">
                            Registrarme
                            </Button>
                        </Form.Item>
                    </Form>                                    
                </div>
            </div>

            <div className="formularioUsuario" id="formularioUsuario">
                <FormularioUsuario idlogin="login" idformuser="formularioUsuario" />
            </div>
        </div>
    );
}

export default InicioSesion;