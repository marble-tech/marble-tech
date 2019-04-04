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
    { isIndex: true, title: 'Introduction', path: PATHS.introduction, post: post.introduction },
    { isIndex: true, title: 'Setting Up the Project', path: PATHS.structure, post: post.structure },
    { isIndex: false, title: 'Database Configuration', path: PATHS.database, post: post.database },
    { isIndex: false, title: 'Creating the Entity Classes', path: PATHS.entities, post: post.entities },
    { isIndex: false, title: 'Creating the Repositories', path: PATHS.repositories, post: post.repositories },
    { isIndex: false, title: 'Routes and App Router', path: PATHS.router, post: post.router },
    { isIndex: false, title: 'Implementing validation', path: PATHS.validations, post: post.validations },
    { isIndex: false, title: 'Creating the Services', path: PATHS.services, post: post.services },
    { isIndex: false, title: 'Creating the Controllers', path: PATHS.controllers, post: post.controllers },
    { isIndex: false, title: ' Implementing Body Parser', path: PATHS.bodyParser, post: post.bodyParser },
]