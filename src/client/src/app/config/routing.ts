import { RouteComponentProps } from "react-router-dom";
import { Home } from "../pages/home/home";
import { Tutorial } from "../pages/tutorial/tutorial";
import { Challenges } from "../pages/challenges/challenges";
import { Register } from "../pages/register/register";

interface RouteConf {
    isIndex?: boolean;
    displayInNavBar?: boolean;
    title: string;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    exactPath: boolean;
}

export const PATHS = {
    home: "/",
    tutorial: "/tutorial/",
    challenges: "/challenges",
    login: "/login",
    register: "/register",
}

export const routes: RouteConf[] = [
    { isIndex: true, title: "Home", path: PATHS.home, component: Home, exactPath:true, displayInNavBar:false },
    { isIndex: false, title: "Tutorial", path: PATHS.tutorial, component: Tutorial, exactPath:false },
    { isIndex: false, title: "Challenges", path: PATHS.challenges, component: Challenges, exactPath:false },
    { isIndex: false, title: "Login", path: PATHS.login, component: Home, exactPath:true },
    { isIndex: false, title: "Register", path: PATHS.register, component: Register, exactPath:true },
    
]