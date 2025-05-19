// Experience type
export type TExperience = {
  company: string;
  position: string;
  description: string;
  images: string[];
  timeFrame: string;
  isDeleted: boolean; // default: false
  createdAt?: Date;
  updatedAt?: Date;
};
