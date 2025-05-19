// Project type
export type TProject = {
  title: string;
  description: string;
  features: string;
  image: string;
  stacks: string[];
  liveURL: string;
  frontEndGitHubURL: string;
  backEndGitHubURL: string;
  isDeleted: boolean; // default: false
  createdAt?: Date;
  updatedAt?: Date;
};
