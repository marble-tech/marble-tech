import { UserController} from '../controllers/userController';
import { authMiddleware } from '../config/authMiddleware';

const userController = new UserController();

const routes = [
  {
    method: 'get',
    path: '/',
    middlewares: [],
    description: 'get all users',
    body: ['none'],
    action: userController.findAll
  },
  {
    method: 'get',
    path: '/:id',
    middlewares: [],
    description: 'get user by id',
    body: ['none'],
    action: userController.findById
  },
  {
    method: 'post',
    path: '/',
    middlewares: [],
    description: 'create a user',
    body: ['f_name: string', 'l_name: string', 'email: string', 'password: string'],
    action: userController.create
  },
  {
    method: 'patch',
    path: '/:id',
    middlewares: [authMiddleware],
    description: 'update a user by id',
    body: ['f_name: string (optional)', 'l_name: string (optional)', 'email: string (optional)', 'password: string (optional)'],
    action: userController.updateUser
  },
  {
    method: 'delete',
    path: '/:id',
    middlewares: [authMiddleware],
    description: 'delete a user by id',
    body: ['none'],
    action: userController.deleteUser
  }
]


export default routes;