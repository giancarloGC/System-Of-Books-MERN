//Aqui estoy haciendo las funciones para decodificar el accesstoken y sacar de el la informacion
import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../util/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if(!accessToken || accessToken === "null"){
        return null;
    }
    return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshToken(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(!refreshToken || refreshToken === "null"){
        return null;
    }
    return willExpireToken(refreshToken) ? null : refreshToken;
}


function willExpireToken(token){
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;

    //console.log(metaToken);
    return now > exp;
}