import { model, Schema } from 'mongoose';
import { TBlogPost } from './blogPost.interface';

// BlogPost Schema
const blogPostSchema = new Schema<TBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      trim: true,
    },

    content: {
      type: String,
      required: [true, 'Content is required!'],
      trim: true,
    },

    url: {
      type: String,
      required: [true, 'URL is required!'],
      unique: [true, 'URL is already used!'],
      trim: true,
    },

    images: {
      type: [String],
      required: [true, 'Image is required!'],
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author is required!'],
      ref: 'User', // model name
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// BlogPost Query middleware #1 (for find)
blogPostSchema.pre('find', function (next) {
  // while we are getting all data by using find method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// BlogPost Query middleware #2 (for findOne)
blogPostSchema.pre('findOne', function (next) {
  // while we are getting single data by using findOne method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// BlogPost Query middleware #3 (for aggregate)
blogPostSchema.pre('aggregate', function (next) {
  // while we are getting all data by using aggregate(find) method we want to exclude the data that has isDeleted: true
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// BlogPost Model
export const BlogPost = model<TBlogPost>('BlogPost', blogPostSchema);
