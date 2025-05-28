/* eslint-disable @typescript-eslint/no-explicit-any */
import { projectService } from './project.service';
import tryCatchAsync from '../../utils/tryCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/ImageFile';

// createProject
const createProject = tryCatchAsync(async (req, res) => {
  const result = await projectService.createProjectIntoDB(
    req.file as IImageFile,
    req.body,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project added successfully!',
    data: result,
  });
});

// getAllProjects
const getAllProjects = tryCatchAsync(async (req, res) => {
  const result = await projectService.getAllProjectsFromDB(req.query);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Projects retrieved successfully!',
    data: result.data,
    meta: result.meta,
  });
});

// getProjectById
const getProjectById = tryCatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await projectService.getProjectByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project retrieved successfully!',
    data: result,
  });
});

// updateProjectById
const updateProjectById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;

  const result = await projectService.updateProjectByIdIntoDB(
    id,
    req.file as IImageFile,
    projectData,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully!',
    data: result,
  });
});

// deleteProjectById
const deleteProjectById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectService.deleteProjectByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project deleted successfully!',
    data: result,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
