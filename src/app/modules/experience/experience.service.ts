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
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Experience images are required!',
    );
  }

  // set an array of all images path
  experienceData.images = experience.map((image) => image.path);

  const result = Experience.create(experienceData);
  // const data = new Experience(experienceData);
  // const result = await data.save();

  return result;
};

// getAllExperiencesFromDB
const getAllExperiencesFromDB = async () => {
  const result = await Experience.find();
  return result;
};

// getExperienceByIdFromDB
const getExperienceByIdFromDB = async (experienceId: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(experienceId)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await Experience.aggregate([
  //   { $match: { _id: new Types.ObjectId(experienceId) } },
  // ]);
  //  return result[0] || null;

  // checking if the Experience is exist
  const experience = await Experience.findById(experienceId);
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!');
  }

  // checking if the Experience is already deleted
  const isDeleted = experience?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'This experience is already deleted!',
    );
  }

  return experience;
};

// updateExperienceByIdIntoDB
const updateExperienceByIdIntoDB = async (
  experienceId: string,
  experienceImages: IImageFiles,
  updateData: TExperience,
) => {
  // checking if the Experience is exist
  const savedExperience = await Experience.findById(experienceId);
  if (!savedExperience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!');
  }

  // checking if the Experience is already deleted
  const isDeleted = savedExperience?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'This experience is already deleted!',
    );
  }

  // images part optional for updating
  const { experience } = experienceImages;
  if (experience) {
    // set an array of all images path
    const newImages = experience.map((image) => image.path);
    if (updateData.images) {
      updateData.images = [...updateData.images, ...newImages];
    } else {
      updateData.images = newImages;
    }
  }

  savedExperience.set(updateData);
  const result = await savedExperience.save();
  return result;
};

// deleteExperienceByIdFromDB
const deleteExperienceByIdFromDB = async (experienceId: string) => {
  // checking if the Experience is exist
  const experience = await Experience.findById(experienceId);
  if (!experience) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Experience not found!');
  }

  // checking if the Experience is already deleted
  const isDeleted = experience?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'This experience is already deleted!',
    );
  }

  // soft delete - update the isDeleted field to true
  await Experience.findByIdAndUpdate(experienceId, { isDeleted: true });

  return null;
};

export const experienceService = {
  createExperienceIntoDB,
  getAllExperiencesFromDB,
  getExperienceByIdFromDB,
  updateExperienceByIdIntoDB,
  deleteExperienceByIdFromDB,
};
