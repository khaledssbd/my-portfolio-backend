import { BlogPost } from './blogPost.model';
import { TBlogPost } from './blogPost.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogPostSearchableFields } from './blogPost.constant';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { IImageFiles } from '../../interface/ImageFile';
import { JwtPayload } from 'jsonwebtoken';
// import { Types } from 'mongoose';

// createBlogPostIntoDB
const createBlogPostIntoDB = async (
  postImages: IImageFiles,
  postData: TBlogPost,
  userData: JwtPayload,
) => {
  const { blogPost } = postImages;
  if (!blogPost || blogPost.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Post images are required!');
  }

  // set an array of all images path
  postData.images = blogPost.map((image) => image.path);

  // // checking post url if post exists
  // const post = await BlogPost.findOne({ url: postData.url });
  // if (post) {
  //   throw new AppError(StatusCodes.NOT_FOUND, 'Url already used!');
  // } // url:unique in BlogPost model (using to show error message in data.massage)

  // set author from loggedIn user
  postData.author = userData._id;

  // const result = BlogPost.create(postData);
  const data = new BlogPost(postData);
  const result = await data.save();

  return result;
};

// getAllBlogPostsFromDB
const getAllBlogPostsFromDB = async (query: Record<string, unknown>) => {
  const allBlogPostsQuery = new QueryBuilder(
    BlogPost.find().populate('author'),
    query,
  )
    .search(blogPostSearchableFields)
    .filter()
    .range()
    .sort()
    .paginate()
    .fields();

  const data = await allBlogPostsQuery.modelQuery;
  const meta = await allBlogPostsQuery.countTotal();

  return {
    data,
    meta,
  };
};

// getBlogPostByIdFromDB
const getBlogPostByIdFromDB = async (postID: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(postID)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await BlogPost.aggregate([
  //   { $match: { _id: new Types.ObjectId(postID) } },
  // ]);
  //  return result[0] || null;

  // checking if the Post is exist
  const post = await BlogPost.findById(postID).populate('author');
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

// getBlogPostByURLFromDB
const getBlogPostByURLFromDB = async (postURL: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(postID)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await BlogPost.aggregate([
  //   { $match: { _id: new Types.ObjectId(postID) } },
  // ]);
  //  return result[0] || null;

  // checking if the Post is exist
  const post = await BlogPost.findOne({ url: postURL }).populate('author');
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

// updateBlogPostByIdIntoDB
const updateBlogPostByIdIntoDB = async (
  postID: string,
  postImages: IImageFiles,
  updateData: TBlogPost,
  userData: JwtPayload,
) => {
  // checking if the Post is exist
  const savedPost = await BlogPost.findById(postID);
  if (!savedPost) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = savedPost?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // set author from loggedIn user
  updateData.author = userData._id;

  // images part optional for updating
  const { blogPost } = postImages;
  if (blogPost) {
    // set an array of all images path
    const newImages = blogPost.map((image) => image.path);
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

// deleteBlogPostByIdFromDB
const deleteBlogPostByIdFromDB = async (postId: string) => {
  // checking if the Post is exist
  const post = await BlogPost.findById(postId);
  if (!post) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
  }

  // checking if the Post is already deleted
  const isDeleted = post?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This post is already deleted!');
  }

  // soft delete - update the isDeleted field to true
  await BlogPost.findByIdAndUpdate(postId, { isDeleted: true });

  return null;
};

export const blogPostService = {
  createBlogPostIntoDB,
  getAllBlogPostsFromDB,
  getBlogPostByIdFromDB,
  getBlogPostByURLFromDB,
  updateBlogPostByIdIntoDB,
  deleteBlogPostByIdFromDB,
};
