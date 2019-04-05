import React from 'react';
import { Home } from "../pages/home/home";
import { Tutorial } from "../pages/tutorial/tutorial";
import { Challenges } from "../pages/challenges/challenges";
import { Register } from "../pages/register/register";

interface RouteConf {
    isIndex?: boolean;
    displayInNavBar?: boolean;
    title: string;
    path: string;
    component: JSX.Element //React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    exact: boolean;
    isProtected?: boolean;
    onlyGuest?:boolean;
}

export const PATHS = {
    home: "/",
    tutorial: "/tutorial/",
    challenges: "/challenges",
    login: "/login",
    register: "/register",
}

export const routes: RouteConf[] = [
    { isIndex: true, title: "Home", path: PATHS.home, component: <Home/> , exact:true, displayInNavBar:false },
    { isIndex: false, title: "Tutorial", path: PATHS.tutorial, component: <Tutorial/>, exact:false },
    { isIndex: false, title: "Challenges", path: PATHS.challenges, component: <Challenges/>, exact:false, isProtected:true },
    { isIndex: false, title: "Login", path: PATHS.login, component: <Home/>, exact:true, onlyGuest:true },
    { isIndex: false, title: "Register", path: PATHS.register, component: <Register/>, exact:true, onlyGuest:true },
    
]