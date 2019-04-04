import { AuthController} from '../controllers/authController';

const authController = new AuthController();

const routes = [
  {
    method: 'post',
    path: '/login',
    middlewares: [],
    description: 'authenticate a user',
    body: ['email: string', 'password: string'],
    action: authController.login
  }
]

export default routes;