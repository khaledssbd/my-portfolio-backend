import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
    },

    image: {
      type: String,
    },

    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Email is already used!'],
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: 0, // will hide the password field from all find methods
    },

    passwordChangedAt: {
      type: Date,
    },

    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', async function (next) {
  // Hashing password before saving
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  // Hiding the Hashed password from returned data
  doc.password = '';
  next();
});

// isUserExistsByEmail
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password'); // will show the password
};

// isPasswordMatched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// isJWTIssuedBeforePasswordChanged
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
