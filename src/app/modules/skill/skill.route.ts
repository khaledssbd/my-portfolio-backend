import { Router } from 'express';
import { skillController } from './skill.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { skillValidation } from './skill.validation';
import { AUTH_ROLES } from '../user/user.constant';

const router = Router();

// create Skill
router.post(
  '/',
  auth(AUTH_ROLES.admin),
  validateRequest(skillValidation.createSkillValidationSchema),
  skillController.createSkill,
);

// get all Skills
router.get('/', skillController.getAllSkills);

// update Skill by id
router.patch(
  '/update/:id',
  auth(AUTH_ROLES.admin),
  validateRequest(skillValidation.updateSkillValidationSchema),
  skillController.updateSkillById,
);

// delete Skill by id
router.delete('/:id', auth(AUTH_ROLES.admin), skillController.deleteSkillById);

export const SkillRoutes = router;
