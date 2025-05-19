import { Experience } from './experience.model';
import { TExperience } from './experience.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { IImageFiles } from '../../interface/ImageFile';
// import { JwtPayload } from 'jsonwebtoken';
// import { Types } from 'mongoose';

// createExperienceIntoDB
const createExperienceIntoDB = async (
  experienceImages: IImageFiles,
  experienceData: TExperience,
) => {
  const { experience } = experienceImages;
  if (!experience || experience.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Post images are required!');
  }

  // set an array of all images path
  experienceData.images = experience.map((image) => image.path);

  // // checking post url if post exists
  // const post = await Experience.findOne({ url: postData.url });
  // if (post) {
  //   throw new AppError(StatusCodes.NOT_FOUND, 'Url already used!');
  // } // url:unique in Experience model (using to show error message in data.massage)

  const result = Experience.create(experienceData);
  // const data = new Experience(postData);
  // const result = await data.save();

  return result;
};

// getAllExperiencesFromDB
const getAllExperiencesFromDB = async () => {
  const result = await Experience.find();
  return result;
};

// getExperienceByIdFromDB
const getExperienceByIdFromDB = async (postID: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(postID)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await Experience.aggregate([
  //   { $match: { _id: new Types.ObjectId(postID) } },
  // ]);
  //  return result[0] || null;

  // checking if the Post is exist
  const post = await Experience.findById(postID);
  if (!post) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = post?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  return post;
};

// updateExperienceByIdIntoDB
const updateExperienceByIdIntoDB = async (
  postID: string,
  postImages: IImageFiles,
  updateData: TExperience,
) => {
  // checking if the Post is exist
  const savedPost = await Experience.findById(postID);
  if (!savedPost) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = savedPost?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // images part optional for updating
  const { experience } = postImages;
  if (experience) {
    // set an array of all images path
    const newImages = experience.map((image) => image.path);
    if (updateData.images) {
      updateData.images = [...updateData.images, ...newImages];
    } else {
      updateData.images = newImages;
    }
  }

  savedPost.set(updateData);
  const result = await savedPost.save();
  return result;
};

// deleteExperienceByIdFromDB
const deleteExperienceByIdFromDB = async (postId: string) => {
  // checking if the Post is exist
  const post = await Experience.findById(postId);
  if (!post) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = post?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // soft delete - update the isDeleted field to true
  await Experience.findByIdAndUpdate(postId, { isDeleted: true });

  return null;
};

export const experienceService = {
  createExperienceIntoDB,
  getAllExperiencesFromDB,
  getExperienceByIdFromDB,
  updateExperienceByIdIntoDB,
  deleteExperienceByIdFromDB,
};
