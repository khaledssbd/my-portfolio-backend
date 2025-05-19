import { Skill } from './skill.model';
import { TSkill } from './skill.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
// import { IImageFile } from '../../interface/ImageFile';
// import { JwtPayload } from 'jsonwebtoken';
// import { Types } from 'mongoose';

// createSkillIntoDB
const createSkillIntoDB = async (
  // image: IImageFile,
  skillData: TSkill,
) => {
  // if (!image) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Skill icon is required!');
  // } else if (image && image.path) {
  //   skillData.icon = image.path;
  // }

  const result = Skill.create(skillData);
  // const data = new Skill(postData);
  // const result = await data.save();

  return result;
};

// getAllSkillsFromDB
const getAllSkillsFromDB = async () => {
  const result = await Skill.find();
  return result;
};

// updateSkillByIdIntoDB
const updateSkillByIdIntoDB = async (
  skillID: string,
  // image: IImageFile,
  updateData: TSkill,
) => {
  // checking if the Skill is exist
  const savedPost = await Skill.findById(skillID);
  if (!savedPost) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found!');
  }

  // checking if the Skill is already deleted
  const isDeleted = savedPost?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This skill is already deleted!');
  }

  // // image part optional for updating
  // if (image && image.path) {
  //   // sending image is optional
  //   updateData.icon = image.path;
  // }

  savedPost.set(updateData);
  const result = await savedPost.save();
  return result;
};

// deleteSkillByIdFromDB
const deleteSkillByIdFromDB = async (postId: string) => {
  // checking if the Post is exist
  const post = await Skill.findById(postId);
  if (!post) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = post?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // soft delete - update the isDeleted field to true
  await Skill.findByIdAndUpdate(postId, { isDeleted: true });

  return null;
};

export const skillService = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  updateSkillByIdIntoDB,
  deleteSkillByIdFromDB,
};
