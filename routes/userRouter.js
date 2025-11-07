import express from 'express';
import { createUser, getUser, sendOTP, loginUser , googleLogin, getAllUsers, blockOrUnblockUser, changePasswordViaOTP, updateUserData , updatePassword} from '../controllers/userController.js';
 
const userRouter = express.Router();

// The registration route is fine as '/'
userRouter.post('/register', createUser);

// The login route should be '/login' because it's prefixed by '/users'
userRouter.post('/login', loginUser);

userRouter.get('/me',getUser);
userRouter.post('/google-login',googleLogin);
userRouter.get('/all-users',getAllUsers);
userRouter.put('/block/:email',blockOrUnblockUser);
userRouter.get('/send-otp/:email',sendOTP);
userRouter.post('/change-password/',changePasswordViaOTP);
userRouter.put('/me', updateUserData);
userRouter.put('/me/password', updatePassword);


export default userRouter;