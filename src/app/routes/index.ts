import { Router } from 'express';
import { BlogPostRoutes } from '../modules/blogPost/blogPost.route';
import { UserRoutes } from '../modules/user/user.route';
import { ExperienceRoutes } from '../modules/experience/experience.route';
import { ProjectRoutes } from '../modules/project/project.route';
import { SkillRoutes } from '../modules/skill/skill.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/blogpost',
    route: BlogPostRoutes,
  },
  {
    path: '/experience',
    route: ExperienceRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/skill',
    route: SkillRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
