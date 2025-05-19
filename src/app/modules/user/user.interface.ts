import { Model, Types } from 'mongoose';
import { AUTH_ROLES } from './user.constant';

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  image: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof AUTH_ROLES; // "admin"

export type TLoginUser = {
  email: string;
  password: string;
};
