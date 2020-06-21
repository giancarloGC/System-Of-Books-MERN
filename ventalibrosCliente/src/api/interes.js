import { basePath, apiVersion} from "./config";

export function registrarLibroInteresApi(data){//en la data esta toda la informacion
    const url = `${basePath}/${apiVersion}/crearLibroInteres`;//esta es la misma url que usabamos en el potsman los endpoint
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
            if(result.interes){
                return {
                    ok: true,
                    message: "Interes Registrado Exitosamente"
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