import React from "react";
import {Route, Switch} from "react-router-dom"; 
import {Layout} from "antd";
import Cabecera from "../components/Cabecera";
import "../scss/cabeceraa.scss";

function LayoutCabecera(props){   
    
    const { routes } = props;
    const { Content } = Layout;
  //  console.log(props);
    
    return(
        <Layout>
                <Cabecera /> 
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <LoadRoutes routes={routes} />
                    </Content>
                </Layout>
        </Layout>
    );
}

function LoadRoutes({ routes }){

    return(
        <Switch>
            {routes.map((route, index) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
        />
    ))}            
        </Switch>
    )
}

export default LayoutCabecera;