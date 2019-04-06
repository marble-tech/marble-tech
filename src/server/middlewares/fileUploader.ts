import multer from 'multer';
import { Request } from 'express';

// Set the file destination folder and it's filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/images'),
  filename: (req, file, cb) => cb(null, new Date().toISOString() + file.originalname)
});

// Accepts only 'jpeg' and 'png' image formats
const fileFilter = (req: Request, file: any, cb: any) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

// Return the uploader setting the max image size to 5MB
export const uploader = multer({
  storage: storage,
  limits: {fileSize: 1024*1024*5},
  fileFilter: fileFilter
});