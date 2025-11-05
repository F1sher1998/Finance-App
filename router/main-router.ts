import { Router } from 'express';
import { UserRegister, UserLogIN } from '../controllers/user-controller.ts';
import { CreateSubscription } from '../controllers/subscription-controller.ts';


const router = Router();

router.route('/user/create').post(UserRegister);
router.route('/user/login').post( UserLogIN);
router.route('/user/subscription/create').post( CreateSubscription);

export default router;