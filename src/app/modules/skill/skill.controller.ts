/* eslint-disable @typescript-eslint/no-explicit-any */
import { skillService } from './skill.service';
import tryCatchAsync from '../../utils/tryCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
// import { IImageFile } from '../../interface/ImageFile';

// createSkill
const createSkill = tryCatchAsync(async (req, res) => {
  const result = await skillService.createSkillIntoDB(
    // req.file as IImageFile,
    req.body,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill added successfully!',
    data: result,
  });
});

// getAllSkills
const getAllSkills = tryCatchAsync(async (req, res) => {
  const result = await skillService.getAllSkillsFromDB(req.query);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skills retrieved successfully!',
    data: result.data,
    meta: result.meta,
  });
});

// getSkillById
const getSkillById = tryCatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await skillService.getSkillByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill retrieved successfully!',
    data: result,
  });
});

// updateSkillById
const updateSkillById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const skillData = req.body;

  const result = await skillService.updateSkillByIdIntoDB(
    id,
    // req.file as IImageFile,
    skillData,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill updated successfully!',
    data: result,
  });
});

// deleteSkillById
const deleteSkillById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await skillService.deleteSkillByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill deleted successfully!',
    data: result,
  });
});

export const skillController = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkillById,
  deleteSkillById,
};
