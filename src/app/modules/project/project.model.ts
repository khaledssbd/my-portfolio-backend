import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

// Project Schema
const projectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      trim: true,
      unique: [true, 'Title is already used!'],
    },

    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
    },

    features: {
      type: String,
      required: [true, 'Features is required!'],
      trim: true,
    },

    image: {
      type: String,
      required: [true, 'Image is required!'],
      trim: true,
    },

    stacks: {
      type: [String],
      required: [true, 'Stacks is required!'],
      trim: true,
    },

    liveURL: {
      type: String,
      required: [true, 'Live-URL is required!'],
      trim: true,
    },

    frontEndGitHubURL: {
      type: String,
      required: [true, 'FrontEnd-GitHub-URL is required!'],
      trim: true,
    },

    backEndGitHubURL: {
      type: String,
      required: [true, 'BackEnd-GitHub-URL is required!'],
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Project Query middleware #1 (for find)
projectSchema.pre('find', function (next) {
  // while we are getting all data by using find method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Project Query middleware #2 (for findOne)
projectSchema.pre('findOne', function (next) {
  // while we are getting single data by using findOne method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Project Query middleware #3 (for aggregate)
projectSchema.pre('aggregate', function (next) {
  // while we are getting all data by using aggregate(find) method we want to exclude the data that has isDeleted: true
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Project Model
export const Project = model<TProject>('Project', projectSchema);
