/* eslint-disable @typescript-eslint/no-explicit-any */
import { experienceService } from './experience.service';
import tryCatchAsync from '../../utils/tryCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IImageFiles } from '../../interface/ImageFile';

// createExperience
const createExperience = tryCatchAsync(async (req, res) => {
  const result = await experienceService.createExperienceIntoDB(
    req.files as IImageFiles,
    req.body,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Experience added successfully!',
    data: result,
  });
});

// getAllExperiences
const getAllExperiences = tryCatchAsync(async (req, res) => {
  const result = await experienceService.getAllExperiencesFromDB();

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Experiences retrieved successfully!',
    data: result,
  });
});

// getExperienceById
const getExperienceById = tryCatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await experienceService.getExperienceByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Experience retrieved successfully!',
    data: result,
  });
});

// updateExperienceById
const updateExperienceById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const experienceData = req.body;

  const result = await experienceService.updateExperienceByIdIntoDB(
    id,
    req.files as IImageFiles,
    experienceData,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Experience updated successfully!',
    data: result,
  });
});

// deleteExperienceById
const deleteExperienceById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await experienceService.deleteExperienceByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Experience deleted successfully!',
    data: result,
  });
});

export const experienceController = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperienceById,
  deleteExperienceById,
};
