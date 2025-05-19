import { Router } from 'express';
import { projectController } from './project.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { projectValidation } from './project.validation';
import { AUTH_ROLES } from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = Router();

// create Project
router.post(
  '/',
  auth(AUTH_ROLES.admin),
  multerUpload.single('project'), // better fieldname for url
  parseBody,
  validateRequest(projectValidation.createProjectValidationSchema),
  projectController.createProject,
);

// get all Projects
router.get('/', projectController.getAllProjects);

// get Project by id
router.get('/:id', projectController.getProjectById);

// update Project by id
router.patch(
  '/update/:id',
  auth(AUTH_ROLES.admin),
  multerUpload.single('project'), // better fieldname for url
  parseBody,
  validateRequest(projectValidation.updateProjectValidationSchema),
  projectController.updateProjectById,
);

// delete Project by id
router.delete(
  '/:id',
  auth(AUTH_ROLES.admin),
  projectController.deleteProjectById,
);

export const ProjectRoutes = router;
