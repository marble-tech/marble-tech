import { RouteComponentProps } from "react-router-dom";
import { Home } from "../pages/home/home";
import { Tutorial } from "../pages/tutorial/tutorial";
import * as post from '../../posts/index';

interface RouteConf {
    isIndex?: boolean;
    displayInNavBar?: boolean;
    title: string;
    path: string;
    post?: any;
}
const BASE_PATH = '/tutorial'
const FILES_PATH = '/posts/'


export const PATHS = {
    introduction: BASE_PATH + '/',
    structure: BASE_PATH + '/structure',
    database: BASE_PATH + "/database",
    entities: BASE_PATH + "/entities",
    repositories: BASE_PATH + "/repositories",
    router: BASE_PATH + "/router",
    validations: BASE_PATH + "/validations",
    services: BASE_PATH + "/services",
    controllers: BASE_PATH + "/controllers",
    bodyParser: BASE_PATH + "/body-parser",
}

export const postsRoutes: RouteConf[] = [
    { isIndex: true, title: '1 - Introduction', path: PATHS.introduction, post: post.introduction },
    { isIndex: true, title: '2 - Setting Up the Project', path: PATHS.structure, post: post.structure },
    { isIndex: false, title: '3 - Database Configuration', path: PATHS.database, post: post.database },
    { isIndex: false, title: '4 - Creating the Entity Classes', path: PATHS.entities, post: post.entities },
    { isIndex: false, title: '5 - Creating the Repositories', path: PATHS.repositories, post: post.repositories },
    { isIndex: false, title: '6 - Routes and App Router', path: PATHS.router, post: post.router },
    { isIndex: false, title: '7 - Implementing validation', path: PATHS.validations, post: post.validations },
    { isIndex: false, title: '8 - Creating the Services', path: PATHS.services, post: post.services },
    { isIndex: false, title: '9 - Creating the Controllers', path: PATHS.controllers, post: post.controllers },
    { isIndex: false, title: '10 - Implementing Body Parser', path: PATHS.bodyParser, post: post.bodyParser },
]