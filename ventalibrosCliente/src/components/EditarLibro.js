import React, {useState, useEffect, useCallback} from "react";
import {useDropzone} from "react-dropzone";

import "../scss/MiCuenta.scss";
import { Avatar, icon, Form, Button, Input, notification} from "antd";

import "../scss/AgregarLibro.scss";

import { useParams } from "react-router-dom";
import { getBookApi, getAvatarApi, uploadAvatarApi } from '../api/libro';

import NoAvatar from '../../src/img/noAvatar.png';

export default function EditarLibro(){
    const { idBook } = useParams();
    const datos = {
        idBook: idBook
    }

    const [bookEdit, setBookEdit] = useState({});
    useEffect(() => {
        getBookApi(datos).then(response => {
            setBookEdit(response.data)
        });        
    },[]);
    //Imagen
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
            getAvatarApi(idBook).then(response => {
                setAvatar(response);
            });
    }, []);

    console.log("propiedades del avatar!!!");
    console.log(avatar);

    
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (avatar) {
          setUserData({ ...userData, avatar: avatar.file });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [avatar]);



    const actualizarDatos = (e) => {
        e.preventDefault();
        console.log('FUNCIONANNNNDOOOOO BITCHEESSSS');
        console.log(avatar);
        console.log(userData);
        if(typeof userData.avatar === "object"){
            console.log("logrado");
             uploadAvatarApi(userData.avatar, idBook).then(response => {
                notification["success"]({
                    message: response.message
                });
            });
        }else{
            console.log("fuck");           
        }
    };

    //const avatarData = avatar.file;
/*    useEffect(() => {
        if(avatar.file){
            getAvatarApi(avatar.file).then(response => {
                setAvatar(response);
            });
        }else{
            setAvatar(null);
        }
    }, [avatar.file]);  */  

    /*useEffect(() => {
        if(avatar){
            setUset
        }
    }, []);*/
    return(
        <div>
        <center><h1 class="titulo">Editar Libro</h1></center>
            <div className="container formulariolibro">
            <Form onSubmitCapture={actualizarDatos}>            
                <div className="row espacionombre">
                    <div class="col-md-3">
                        <p class="labelslibro">Título:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="titulo" value={bookEdit.titulo} id="titulo"/>
                    </div>                
                </div> 
                <div className="row espaciolibro">
                    <div class="col-md-3">
                        <p class="labelslibro">Editorial:</p>
                    </div>
                    <div class="col-md-9">
                        <Input name="editorial" value={bookEdit.editorial} id="editorial" required/>
                    </div>                
                </div>    
                <div className="row espaciolibro">
                    <div class="col-md-3">
                        <p class="labelslibro">Descripción:</p>
                    </div>
                    <div class="col-md-9">
                        <Input.TextArea name="descripcion" value={bookEdit.descripcion} id="descripcion" required/>
                    </div>                
                </div> 
                <div className="row espaciolibro">
                    <div class="col-md-3">
                        <p class="labelslibro">Imagen:</p>
                    </div>
                    <div class="col-md-9">
                    <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
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

//              

function UploadAvatar (props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview);
            }else{
                setAvatarUrl(avatar)
            }
        }else{
            setAvatarUrl(null);
        }
    }, [avatar]);
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file)}); 
        },
        [setAvatar]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jepg, image/png',
        noKeyBoard: true,
        onDrop 
    });

    return(
        <div class="upload-avatar" {...getRootProps()}> 
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )

}
