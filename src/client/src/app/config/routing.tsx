import React from 'react';
import { Home } from "../pages/home/home";
import { Tutorial } from "../pages/tutorial/tutorial";
import { Challenges } from "../pages/challenges/challenges";
import { Register } from "../pages/register/register";
import { Dashboard } from '../pages/dashboard/dashboard';

interface RouteConf {
    isIndex?: boolean;
    displayInNavBar?: boolean;
    title: string;
    path: string;
    component: JSX.Element //React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    exact: boolean;
    isProtected?: boolean;
    onlyGuest?:boolean;
    href:string;
}

export const PATHS = {
    home: "/",
    tutorial: "/tutorial/",
    challenges: "/challenges/:id",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
}
export const HREF = {
    home: "/",
    tutorial: "/tutorial/",
    challenges: "/challenges/1",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    
}

export const routes: RouteConf[] = [
    { href: HREF.home, isIndex: true, title: "Home", path: PATHS.home, component: <Home/> , exact:true, displayInNavBar:false },
    { href: HREF.tutorial, isIndex: false, title: "Tutorial", path: PATHS.tutorial, component: <Tutorial/>, exact:false },
    { href: HREF.challenges, isIndex: false, title: "Challenges", path: PATHS.challenges, component: <Challenges/>, exact:false, isProtected:true },
    { href: HREF.login, isIndex: false, title: "Login", path: PATHS.login, component: <Home/>, exact:true, onlyGuest:true },
    { href: HREF.register, isIndex: false, title: "Register", path: PATHS.register, component: <Register/>, exact:true, onlyGuest:true },
    { href: HREF.dashboard, isIndex: false, title: "Dashboard", path: PATHS.dashboard, component: <Dashboard/>, exact:true, onlyGuest:false, isProtected:true, displayInNavBar:false  },
    
]

