import { Project } from './project.model';
import { TProject } from './project.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/ImageFile';
// import { JwtPayload } from 'jsonwebtoken';
// import { Types } from 'mongoose';

// createProjectIntoDB
const createProjectIntoDB = async (
  image: IImageFile,
  projectData: TProject,
) => {
  if (!image) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Project image is required!');
  } else if (image && image.path) {
    projectData.image = image.path;
  }

  // // checking post url if post exists
  // const post = await Project.findOne({ url: postData.url });
  // if (post) {
  //   throw new AppError(StatusCodes.NOT_FOUND, 'Url already used!');
  // } // url:unique in Project model (using to show error message in data.massage)

  const result = Project.create(projectData);
  // const data = new Project(postData);
  // const result = await data.save();

  return result;
};

// getAllProjectsFromDB
const getAllProjectsFromDB = async () => {
  const result = await Project.find();
  return result;
};

// getProjectByIdFromDB
const getProjectByIdFromDB = async (projectID: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(postID)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await Project.aggregate([
  //   { $match: { _id: new Types.ObjectId(postID) } },
  // ]);
  //  return result[0] || null;

  // checking if the Project is exist
  const project = await Project.findById(projectID);
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!');
  }

  // checking if the Project is already deleted
  const isDeleted = project?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'This project is already deleted!',
    );
  }

  return project;
};

// updateProjectByIdIntoDB
const updateProjectByIdIntoDB = async (
  postID: string,
  image: IImageFile,
  updateData: TProject,
) => {
  // checking if the Post is exist
  const savedPost = await Project.findById(postID);
  if (!savedPost) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = savedPost?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // image part optional for updating
  if (image && image.path) {
    // sending image is optional
    updateData.image = image.path;
  }

  savedPost.set(updateData);
  const result = await savedPost.save();
  return result;
};

// deleteProjectByIdFromDB
const deleteProjectByIdFromDB = async (postId: string) => {
  // checking if the Post is exist
  const post = await Project.findById(postId);
  if (!post) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = post?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // soft delete - update the isDeleted field to true
  await Project.findByIdAndUpdate(postId, { isDeleted: true });

  return null;
};

export const projectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectByIdIntoDB,
  deleteProjectByIdFromDB,
};
