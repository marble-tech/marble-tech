import React from 'react';
import { Home } from "../pages/home/home";
import { Tutorial } from "../pages/tutorial/tutorial";
import { Challenges } from "../pages/challenges/challenges";
import { Register } from "../pages/register/register";
import { Dashboard } from '../pages/dashboard/dashboard';
import TermsOfService, {} from '../pages/termsOfService/termsOfService';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { NotFound } from '../pages/notFound/notFound';

interface RouteConf {
    isIndex?: boolean; // true if is the home page
    displayInNavBar?: boolean; // true to display in navbar
    title: string;
    path?: string;
    component: JSX.Element 
    exact: boolean;
    isProtected?: boolean; // true if needs authentication to access page
    onlyGuest?:boolean; // true if only non authenticated user can access page
    href:string; // link to page **do not use params
}

export const PATHS = {
    home: "/",
    tutorial: "/tutorial/",
    challenges: "/challenges/:id",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    termsOfService: "/termsOfService",
    pageNotFount: ""
}
export const HREF = {
    home: "/",
    tutorial: "/tutorial/",
    challenges: "/challenges/1",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    termsOfService: "/termsOfService",
    pageNotFount: ""
    
}

export const routes: RouteConf[] = [
    { href: HREF.home, isIndex: true, title: "Home", path: PATHS.home, component: <Home/> , exact:true, displayInNavBar:false },
    { href: HREF.tutorial, isIndex: false, title: "Tutorial", path: PATHS.tutorial, component: <Tutorial/>, exact:false },
    { href: HREF.challenges, isIndex: false, title: "Challenges", path: PATHS.challenges, component: <Challenges/>, exact:true, isProtected:true },
    { href: HREF.login, isIndex: false, title: "Login", path: PATHS.login, component: <LoginPage/>, exact:true, onlyGuest:true },
    { href: HREF.register, isIndex: false, title: "Register", path: PATHS.register, component: <Register/>, exact:true, onlyGuest:true },
    { href: HREF.dashboard, isIndex: false, title: "Dashboard", path: PATHS.dashboard, component: <Dashboard/>, exact:true, onlyGuest:false, isProtected:true, displayInNavBar:false  },
    { href: HREF.termsOfService, isIndex: false, title: "Terms of Service", path: PATHS.termsOfService, component: <TermsOfService/>, exact:true, onlyGuest:false, isProtected:false, displayInNavBar:false  },
    { href: HREF.pageNotFount, isIndex: false, title: "Page Not Found", component: <NotFound/>, exact:true, onlyGuest:false, isProtected:false, displayInNavBar:false  }

]

