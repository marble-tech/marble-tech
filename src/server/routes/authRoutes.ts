import { AuthController} from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const authController = new AuthController(); // authentication controller instance.

// Stores all authentication routes in an array
const routes = [
  {  // LOGIN
    method: 'post',
    path: '/login',
    middlewares: [],
    description: 'authenticate a user',
    body: ['email: string', 'password: string'],
    action: authController.login
  },
  { // GET USER BY TOKEN
    method: 'get',
    path: '/authUser',
    middlewares: [authMiddleware],
    description: 'get the authenticated user by token',
    body: ['none'],
    action: authController.getAuthUser
  }
]

export default routes;