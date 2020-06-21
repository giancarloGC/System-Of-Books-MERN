import React from "react";
import '.././css/login.css';

function Login(){
    return(
        <div>
            <form action="" method="post">
                <div>
                <input type="email" class="cajaTexto" placeholder="Digite su Usuario aquí" required></input>
                </div>
                <div>
                <input type="password" class="cajaTexto" placeholder="Digite su Password aquí" required></input>
                </div>
                <div>
                <button type="submit" class="btnIgresar">Ingresar</button>
                </div>
            </form>
        </div>        
    )
}
export default Login;