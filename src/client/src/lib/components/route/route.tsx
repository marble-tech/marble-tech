import React from 'react';
import {  Route as ReactRoute, Redirect, RouteComponentProps } from 'react-router-dom';
import * as authGuard from '../../../helpers/authGuard';

interface ProtectedRouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    path: string,
    isProtected?:boolean; 
    exact?:boolean;
}

export class Route extends React.Component<ProtectedRouteProps>{
    constructor(props:ProtectedRouteProps){
        super(props)
    }
    render(){
        const { component, isProtected, ...rest } = this.props;
        
        if(!!isProtected){

            if(authGuard.loggedIn()){
               return (<ReactRoute 
                        {...rest}
                        component={component}
                    />)
            }
            return <ReactRoute 
                {...rest} 
                render={props=> 
                    <Redirect to={{
                        pathname: "/login", 
                        state: { from: props.location }
                    }}/>
                }/>
        
        }else{
            return (<ReactRoute 
                {...rest}
                component={component}
            />
            );
        }
        
    }
}

