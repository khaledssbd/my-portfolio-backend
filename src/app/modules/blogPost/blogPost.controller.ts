/* eslint-disable @typescript-eslint/no-explicit-any */
import { blogPostService } from './blogPost.service';
import tryCatchAsync from '../../utils/tryCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IImageFiles } from '../../interface/ImageFile';

// createBlogPost
const createBlogPost = tryCatchAsync(async (req, res) => {
  const result = await blogPostService.createBlogPostIntoDB(
    req.files as IImageFiles,
    req.body,
    req.user,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post added successfully!',
    data: result,
  });
});

// getAllBlogPosts
const getAllBlogPosts = tryCatchAsync(async (req, res) => {
  const result = await blogPostService.getAllBlogPostsFromDB(req.query);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Posts retrieved successfully!',
    data: result.data,
    meta: result.meta,
  });
});

// getBlogPostById
const getBlogPostById = tryCatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await blogPostService.getBlogPostByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post retrieved successfully!',
    data: result,
  });
});

// getBlogPostByURL
const getBlogPostByURL = tryCatchAsync(async (req, res) => {
  const url = req.params.url;

  const result = await blogPostService.getBlogPostByURLFromDB(url);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post retrieved successfully!',
    data: result,
  });
});

// updateBlogPostById
const updateBlogPostById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const postData = req.body;

  const result = await blogPostService.updateBlogPostByIdIntoDB(
    id,
    req.files as IImageFiles,
    postData,
    req.user,
  );

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post updated successfully!',
    data: result,
  });
});

// deleteBlogPostById
const deleteBlogPostById = tryCatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogPostService.deleteBlogPostByIdFromDB(id);

  sendResponse<any>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post deleted successfully!',
    data: result,
  });
});

export const blogPostController = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  getBlogPostByURL,
  updateBlogPostById,
  deleteBlogPostById,
};
