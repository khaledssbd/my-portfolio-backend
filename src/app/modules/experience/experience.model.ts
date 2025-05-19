import { model, Schema } from 'mongoose';
import { TExperience } from './experience.interface';

// Experience Schema
const experienceSchema = new Schema<TExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company is required!'],
      trim: true,
    },

    position: {
      type: String,
      required: [true, 'Position is required!'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
    },

    images: {
      type: [String],
      required: [true, 'Image is required!'],
      trim: true,
    },

    timeFrame: {
      type: String,
      required: [true, 'Time-Frame is required!'],
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Experience Query middleware #1 (for find)
experienceSchema.pre('find', function (next) {
  // while we are getting all data by using find method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Experience Query middleware #2 (for findOne)
experienceSchema.pre('findOne', function (next) {
  // while we are getting single data by using findOne method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Experience Query middleware #3 (for aggregate)
experienceSchema.pre('aggregate', function (next) {
  // while we are getting all data by using aggregate(find) method we want to exclude the data that has isDeleted: true
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Experience Model
export const Experience = model<TExperience>('Experience', experienceSchema);
