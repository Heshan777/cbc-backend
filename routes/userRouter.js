import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
 
const userRouter = express.Router();

// The registration route is fine as '/'
userRouter.post('/register', createUser);

// The login route should be '/login' because it's prefixed by '/users'
userRouter.post('/login', loginUser);

export default userRouter;