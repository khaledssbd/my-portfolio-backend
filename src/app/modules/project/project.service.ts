import { Project } from './project.model';
import { TProject } from './project.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/ImageFile';
import QueryBuilder from '../../builder/QueryBuilder';
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

  const result = Project.create(projectData);
  // const data = new Project(projectData);
  // const result = await data.save();

  return result;
};

// getAllProjectsFromDB
const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const allProjectsQuery = new QueryBuilder(Project.find(), query)
    .search([])
    .filter()
    .range()
    .sort()
    .paginate()
    .fields();

  const data = await allProjectsQuery.modelQuery;
  const meta = await allProjectsQuery.countTotal();

  return {
    data,
    meta,
  };
};

// getProjectByIdFromDB
const getProjectByIdFromDB = async (projectId: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(projectId)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await Project.aggregate([
  //   { $match: { _id: new Types.ObjectId(projectId) } },
  // ]);
  //  return result[0] || null;

  // checking if the Project is exist
  const project = await Project.findById(projectId);
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
  projectId: string,
  image: IImageFile,
  updateData: TProject,
) => {
  // checking if the Project is exist
  const savedProject = await Project.findById(projectId);
  if (!savedProject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!');
  }

  // checking if the Project is already deleted
  const isDeleted = savedProject?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'This project is already deleted!',
    );
  }

  // image part optional for updating
  if (image && image.path) {
    // sending image is optional
    updateData.image = image.path;
  }

  savedProject.set(updateData);
  const result = await savedProject.save();
  return result;
};

// deleteProjectByIdFromDB
const deleteProjectByIdFromDB = async (projectId: string) => {
  // checking if the Project is exist
  const project = await Project.findById(projectId);
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

  // soft delete - update the isDeleted field to true
  await Project.findByIdAndUpdate(projectId, { isDeleted: true });

  return null;
};

export const projectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectByIdIntoDB,
  deleteProjectByIdFromDB,
};
