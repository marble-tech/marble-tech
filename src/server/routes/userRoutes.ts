import { UserController} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { uploader } from '../middlewares/fileUploader';
import { hollow } from '../middlewares/hollowMiddleware';

const userController = new UserController();

// Store all user routes in an array
const routes = [
  { // get all users
    method: 'get',
    path: '/',
    middlewares: [hollow],
    description: 'get all users',
    body: ['none'],
    action: userController.findAll
  },
  { // get rank
    method: 'post',
    path: '/rank',
    middlewares: [authMiddleware],
    description: 'get users rank',
    body: ['none'],
    action: userController.getRank
  },
  { // get all challenges including user's info
    method: 'post',
    path: '/challenges',
    middlewares: [authMiddleware],
    description: 'get all challenges with user status',
    body: ['none'],
    action: userController.getUserChallenges
  },
  { // get user by ID
    method: 'get',
    path: '/:id',
    middlewares: [hollow],
    description: 'get user by id',
    body: ['none'],
    action: userController.findById
  },
  { // create new user
    method: 'post',
    path: '/',
    middlewares: [hollow],
    description: 'create a user',
    body: ['f_name: string', 'l_name: string', 'email: string', 'password: string'],
    action: userController.create
  },
  { // update user given user ID
    method: 'patch',
    path: '/:id',
    middlewares: [authMiddleware],
    description: 'update a user by id',
    body: ['f_name: string (optional)', 'l_name: string (optional)', 'email: string (optional)', 'password: string (optional)'],
    action: userController.updateUser
  },
  { // delete user given user ID
    method: 'delete',
    path: '/:id',
    middlewares: [authMiddleware],
    description: 'delete a user by id',
    body: ['none'],
    action: userController.deleteUser
  },
  { // add profile image to user
    method: 'post',
    path: '/:id/profileImage',
    middlewares: [authMiddleware, uploader.single('profileImage')],
    description: 'add user profile image',
    body: ['profileImage: File (multipart/form)'],
    action: userController.addProfileImage
  }
]

export default routes;