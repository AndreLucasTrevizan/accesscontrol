import { Router } from 'express';
import { handleCreateUser, handleGetListOfUsers, handleGetUserDetails, handleSignIn } from './controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.route('/users').post(handleCreateUser).get(auth, handleGetListOfUsers);
router.route('/sign_in').post(handleSignIn);
router.route('/users/details').get(auth, handleGetUserDetails);

export { router as UsersRouter };