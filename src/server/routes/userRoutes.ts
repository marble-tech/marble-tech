import { UserController} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { uploader } from '../middlewares/fileUploader';
import { hollow } from '../middlewares/hollowMiddleware';

const userController = new UserController();

const routes = [
  {
    method: 'get',
    path: '/',
    middlewares: [hollow],
    description: 'get all users',
    body: ['none'],
    action: userController.findAll
  },
  {
    method: 'get',
    path: '/:id',
    middlewares: [hollow],
    description: 'get user by id',
    body: ['none'],
    action: userController.findById
  },
  {
    method: 'post',
    path: '/',
    middlewares: [hollow],
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
  },
  {
    method: 'post',
    path: '/:id/profileImage',
    middlewares: [authMiddleware, uploader.single('profileImage')],
    description: 'add user profile image',
    body: ['profileImage: File (multipart/form)'],
    action: userController.addProfileImage
  }
]

export default routes;