import { Router } from 'express';
import { blogPostController } from './blogPost.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogpostValidation } from './blogPost.validation';
import { AUTH_ROLES } from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = Router();

// create BlogPost
router.post(
  '/',
  auth(AUTH_ROLES.admin),
  multerUpload.fields([{ name: 'blogPost' }]), // better fieldname for url
  parseBody,
  validateRequest(blogpostValidation.createBlogPostValidationSchema),
  blogPostController.createBlogPost,
);

// get all BlogPosts
router.get('/', blogPostController.getAllBlogPosts);

// get BlogPost by id
router.get('/:id', blogPostController.getBlogPostById);

// get BlogPost by url
router.get('/post/:url', blogPostController.getBlogPostByURL);

// update BlogPost by id
router.patch(
  '/update/:id',
  auth(AUTH_ROLES.admin),
  multerUpload.fields([{ name: 'blogPost' }]), // better fieldname for url
  parseBody,
  validateRequest(blogpostValidation.updateBlogPostValidationSchema),
  blogPostController.updateBlogPostById,
);

// delete BlogPost by id
router.delete(
  '/:id',
  auth(AUTH_ROLES.admin),
  blogPostController.deleteBlogPostById,
);

export const BlogPostRoutes = router;
