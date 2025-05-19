import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';
// import { Request } from 'express';

// remove file Extension as .png .jgp etc.(A-6)
const removeExtension = (filename: string) => {// (A-6)
  return filename.split('.').slice(0, -1).join('.').replace(/ /g, '-');
};

// interface MulterFile {
//   fieldname: string;
//   originalname: string;
// }

// interface CloudinaryStorageParams {
//   public_id: (req: Request, file: MulterFile) => string;
// }

// const storage: CloudinaryStorage = new CloudinaryStorage({
//   cloudinary: cloudinaryUpload,
//   params: {
//     public_id: (_req: Request, file: MulterFile): string =>
//       Math.random().toString(36).substring(2) +
//       '-' +
//       Date.now() +
//       '-' +
//       file.fieldname +
//       '-' +
//       removeExtension(file.originalname),
//   } as CloudinaryStorageParams,
// });

// export const multerUpload = multer({ storage: storage });

// Cloudinary direct Upload to multer(A-6)
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (_req, file) =>
      Math.random().toString(36).substring(2) +
      '-' +
      Date.now() +
      '-' +
      file.fieldname +
      '-' +
      removeExtension(file.originalname),
  },
});

export const multerUpload = multer({ storage: storage });
