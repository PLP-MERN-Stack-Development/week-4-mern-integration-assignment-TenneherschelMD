import multer from 'multer';
import path from 'path';

// Set up storage strategy
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Folder must exist
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Accept only image files (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
  }
};

// Export the configured multer upload middleware
export const upload = multer({ storage, fileFilter });
