import multer from 'multer';
import { Request } from 'express';

// Select multer type of storate
const storage = multer.memoryStorage();

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