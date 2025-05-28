import { Skill } from './skill.model';
import { TSkill } from './skill.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
// import { IImageFile } from '../../interface/ImageFile';
// import { JwtPayload } from 'jsonwebtoken';
// import { Types } from 'mongoose';

// createSkillIntoDB
const createSkillIntoDB = async (
  // image: IImageFile,
  skillData: TSkill,
) => {
  // if (!image) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Skill icon is required!');
  // } else if (image && image.path) {
  //   skillData.icon = image.path;
  // }

  const result = Skill.create(skillData);
  // const data = new Skill(skillData);
  // const result = await data.save();

  return result;
};

// getAllSkillsFromDB
const getAllSkillsFromDB = async (query: Record<string, unknown>) => {
  const allSkillsQuery = new QueryBuilder(Skill.find(), query)
    .search([])
    .filter()
    .range()
    .sort()
    .paginate()
    .fields();

  const data = await allSkillsQuery.modelQuery;
  const meta = await allSkillsQuery.countTotal();

  return {
    data,
    meta,
  };
};

// getSkillByIdFromDB
const getSkillByIdFromDB = async (skillId: string) => {
  // checking the _id validation for aggregate
  // if (!Types.ObjectId.isValid(skillId)) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid ID!'); // match with handleCastError
  // }
  // const result = await Skill.aggregate([
  //   { $match: { _id: new Types.ObjectId(skillId) } },
  // ]);
  //  return result[0] || null;

  // checking if the Skill is exist
  const skill = await Skill.findById(skillId);
  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found!');
  }

  // checking if the Skill is already deleted
  const isDeleted = skill?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This skill is already deleted!');
  }

  return skill;
};

// updateSkillByIdIntoDB
const updateSkillByIdIntoDB = async (
  skillID: string,
  // image: IImageFile,
  updateData: TSkill,
) => {
  // checking if the Skill is exist
  const savedSkill = await Skill.findById(skillID);
  if (!savedSkill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found!');
  }

  // checking if the Skill is already deleted
  const isDeleted = savedSkill?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This skill is already deleted!');
  }

  // // image part optional for updating
  // if (image && image.path) {
  //   // sending image is optional
  //   updateData.icon = image.path;
  // }

  savedSkill.set(updateData);
  const result = await savedSkill.save();
  return result;
};

// deleteSkillByIdFromDB
const deleteSkillByIdFromDB = async (skillId: string) => {
  // checking if the Skill is exist
  const skill = await Skill.findById(skillId);
  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found!');
  }

  // checking if the Skill is already deleted
  const isDeleted = skill?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This skill is already deleted!');
  }

  // soft delete - update the isDeleted field to true
  await Skill.findByIdAndUpdate(skillId, { isDeleted: true });

  return null;
};

export const skillService = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  getSkillByIdFromDB,
  updateSkillByIdIntoDB,
  deleteSkillByIdFromDB,
};
