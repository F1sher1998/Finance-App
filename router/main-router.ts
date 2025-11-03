import { Router } from 'express';
import { UserRegister, UserLogIN } from '../controllers/user-controller.ts';
import { CreateSubscription } from '../controllers/subscription-controller.ts';
import { authenticateToken } from '../middleware/authMiddleware.ts';


const router = Router();

router.route('/user/create').post(UserRegister);
router.route('/user/login').post(authenticateToken, UserLogIN);
router.route('/user/subscription/create').post(authenticateToken, CreateSubscription);

export default router;