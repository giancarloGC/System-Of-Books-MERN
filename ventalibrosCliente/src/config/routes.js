
import LayoutCabecera from "../layouts/LayoutCabecera";

import InicioSesion from ".././pages/InicioSesion.js";
import ListaAllLibros from "../pages/ListaAllLibros.js";
import MisLibros from "../components/MisLibros.js";
import AgregarLibro from "../components/AgregarLibro";
import Editarlibro from "../components/EditarLibro";
import MiCuenta from "../components/MiCuenta.js";
import Error404 from "../pages/Error404";



const routes = [
    {
        path:"/", component: InicioSesion, exact: true,
            routes: [{
                        path: "/", component: InicioSesion, exact: true
                    },
                    {
                        component: Error404
                    }       
        ]
    },    
    {
        path:"/HomePage", component: LayoutCabecera, exact: false,
            routes: [{
                        path: "/HomePage", component: ListaAllLibros, exact: true
                    },
                    {
                        path: "/HomePage/Mislibros", component: MisLibros, exact: true 
                    },
                    {
                        path: "/HomePage/Agregarlibro", component: AgregarLibro, exact: true 
                    },
                    {
                        path: "/HomePage/Editarlibro", component: Editarlibro, exact: true 
                    },                                        
                    {
                        path: "/HomePage/Micuenta", component: MiCuenta, exact: true 
                    },                    
                    {
                        component: Error404
                    }        
        ]
    }
];

export default routes;
