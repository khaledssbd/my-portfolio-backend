import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './user.controller';
import { AuthValidation } from './user.validation';
import { AUTH_ROLES } from './user.constant';
import { rateLimit, argsForForgotPassword, argsForLogin } from './user.utils';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = Router();

// // register new user
// router.post(
//   '/register',
//   multerUpload.single('user'), // better fieldname for url
//   parseBody,
//   validateRequest(AuthValidation.registerUserValidationSchema),
//   AuthControllers.registerUser,
// );

// login user
router.post(
  '/login', // no auth() here as not logged in
  rateLimit(argsForLogin),
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

// update profile
router.post(
  '/update-profile',
  auth(AUTH_ROLES.admin), // logged in user
  multerUpload.single('user'), // better fieldname for url
  parseBody,
  validateRequest(AuthValidation.updateProfileValidationSchema),
  AuthControllers.updateProfile,
);

// change user password
router.post(
  '/change-password',
  auth(AUTH_ROLES.admin), // logged in user
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// refresh user access token
router.post(
  '/refresh-token', // no auth() here as accessToken is expired
  // validateRequest(AuthValidation.refreshTokenValidationSchema), // not using because verifyToken function inside auth.survices will handle this error
  AuthControllers.refreshToken,
);

// forget password - send email with reset link
router.post(
  '/forgot-password', // no auth() here as not logged in
  rateLimit(argsForForgotPassword),
  validateRequest(AuthValidation.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword, // forget-password-STEP-1
);

// reset password - verify token and update password using reset link
router.post(
  '/reset-password', // no auth() here as not logged in
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword, // forget-password-STEP-2
);

export const UserRoutes = router;
