import { Router } from 'express';
import { UserRegister, UserLogIN } from '../controllers/user-controller.ts';
import { authenticateToken } from '../middleware/authMiddleware.ts';


const router = Router();

router.route('/user/create').post(UserRegister);
router.route('/user/login').post(authenticateToken, UserLogIN);


export default router;