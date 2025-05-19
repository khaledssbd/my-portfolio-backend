import { Router } from 'express';
import { experienceController } from './experience.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { experienceValidation } from './experience.validation';
import { AUTH_ROLES } from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = Router();

// create Experience
router.post(
  '/',
  auth(AUTH_ROLES.admin),
  multerUpload.fields([{ name: 'experience' }]), // better fieldname for url
  parseBody,
  validateRequest(experienceValidation.createExperienceValidationSchema),
  experienceController.createExperience,
);

// get all Experiences
router.get('/', experienceController.getAllExperiences);

// get Experience by id
router.get('/:id', experienceController.getExperienceById);

// update Experience by id
router.patch(
  '/update/:id',
  auth(AUTH_ROLES.admin),
  multerUpload.fields([{ name: 'experience' }]), // better fieldname for url
  parseBody,
  validateRequest(experienceValidation.updateExperienceValidationSchema),
  experienceController.updateExperienceById,
);

// delete Experience by id
router.delete(
  '/:id',
  auth(AUTH_ROLES.admin),
  experienceController.deleteExperienceById,
);

export const ExperienceRoutes = router;
