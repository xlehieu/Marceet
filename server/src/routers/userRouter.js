import express from 'express';
import * as UserController from '../app/controllers/UserController.js';
import { authMiddleware, authUserMiddleWare } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.put('/update/:id', authUserMiddleWare, UserController.updateUser);
router.post('/sign-in', UserController.loginUser);
router.post('/sign-up', UserController.registerUser);
router.post('/log-out', UserController.logoutUser);
router.post('/refresh-token', UserController.refreshToken);
router.delete('/delete/:id', authMiddleware, UserController.deleteUser);
router.get('/detail/:id', authUserMiddleWare, UserController.getUserDetail);
router.get('/', authMiddleware, UserController.getAllUser);
export default router;
