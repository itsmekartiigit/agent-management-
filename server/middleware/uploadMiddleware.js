import multer from "multer";

// Configure memory storage
const storage = multer.memoryStorage();

// File filter with proper validation
const fileFilter = (req, file, cb) => {
  // Define allowed extensions
  const allowedExtensions = [".csv", ".xlsx", ".xls"];
  
  // Check file extension
  const isValidExtension = allowedExtensions.some((ext) =>
    file.originalname.toLowerCase().endsWith(ext)
  );
  
  // Check if file has name
  if (!file.originalname) {
    return cb(new Error("File has no name"), false);
  }
  
  // Validate extension
  if (!isValidExtension) {
    return cb(new Error("Only CSV, XLSX, and XLS files are allowed"), false);
  }
  
  // All good
  cb(null, true);
};

// Configure multer with limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;