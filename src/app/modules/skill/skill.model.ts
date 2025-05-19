import { model, Schema } from 'mongoose';
import { TSkill } from './skill.interface';

// Skill Schema
const skillSchema = new Schema<TSkill>(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      unique: [true, 'Name is already used!'],
      trim: true,
    },

    icon: {
      type: String,
      required: [true, 'Icon is required!'],
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Skill Query middleware #1 (for find)
skillSchema.pre('find', function (next) {
  // while we are getting all data by using find method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Skill Query middleware #2 (for findOne)
skillSchema.pre('findOne', function (next) {
  // while we are getting single data by using findOne method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Skill Query middleware #3 (for aggregate)
skillSchema.pre('aggregate', function (next) {
  // while we are getting all data by using aggregate(find) method we want to exclude the data that has isDeleted: true
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Skill Model
export const Skill = model<TSkill>('Skill', skillSchema);
