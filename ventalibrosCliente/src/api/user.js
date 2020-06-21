import { basePath, apiVersion} from "./config";

export function registrarUsuarioApi(data){//en la data esta toda la informacion
    const url = `${basePath}/${apiVersion}/sign-up`;//esta es la misma url que usabamos en el potsman los endpoint
    const params = {
        method: "POST",
        body: JSON.stringify(data), //se pasa la data a JSON
        headers: {
            "Content-Type": "application/json"
        }
    };
    

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if(result.user){
                return {
                    ok: true,
                    message: "Usuario guardado exitosamente"
                };
            }
            return {
                ok: false,
                message: result.message
            };
        })
        .catch(err => {
            return {
                ok: false,
                message: err.message
            };
        });
}

export function iniciarSesionApi(data){
    const url = `${basePath}/${apiVersion}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(err => {
        return err.message;
    });
    
}