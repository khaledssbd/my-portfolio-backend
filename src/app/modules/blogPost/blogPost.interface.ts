import { Types } from 'mongoose';

// BlogPost type
export type TBlogPost = {
  title: string;
  content: string;
  url: string;
  images: string[];
  author: Types.ObjectId;
  isDeleted: boolean; // default: false
  createdAt?: Date;
  updatedAt?: Date;
};
