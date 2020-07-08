import {basePath, apiVersion} from "./config";

export function registrarLibroApi(data){//en la data esta toda la informacion
    const url = `${basePath}/${apiVersion}/crearLibro`;//esta es la misma url que usabamos en el potsman los endpoint
    const params = {
        method: "POST",
        body: JSON.stringify(data), //se pasa la data a JSON
        headers: {
            //antes estabaa: "Content-Type": "application/json"
            "Content-Type": "application/json"
        }
    };
    

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if(result.libro){
                return {
                    ok: true,
                    message: "Libro Registrado Exitosamente"
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

export function obtenerMisLibrosApi(data){
    const url = `${basePath}/${apiVersion}/getMisLibros`;
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
            //console.log(result);
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export const getBookApi = (data) => {
    const url = `${basePath}/${apiVersion}/getBookEdit`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(res => {
            return res.json();
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err.message;
        })
}


export function eliminarLibroApi(data){
    const url = `${basePath}/${apiVersion}/deleteLibro`;
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
            //console.log(result);
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function obtenerTodosLibrosApi(){
    const url = `${basePath}/${apiVersion}/getTodosLibros`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function uploadAvatarApi (avatar, libroId) {
    const url = `${basePath}/${apiVersion}/upload_img/${libroId}`;
    const formData = new FormData();
    formData.append("avatar", avatar);
    const params = {
        method: "PUT",
        body: formData
    };

    return fetch(url, params)
    .then(response => {
        return response.json()
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    });
}
/*
export const uploadBookApi = (data, idBook) => {
    const url = `${basePath}/${apiVersion}/getBookEdit`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(res => {
            return res.json();
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err.message;
        })
}*/
export function getAvatarApi(avatarName) {
    const url = `${basePath}/${apiVersion}/getImgOfBook/${avatarName}`;
    return fetch(url)
    .then(response => {
        return response.url;
    })
    .catch(err => {
        return err.message;
    });
}

export function updateBoookApi(token, user, userId) {
    const url = `${basePath}/${apiVersion}/update-user/${userId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(user)
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
  }