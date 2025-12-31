import multer from "multer";

const storage = multer.memoryStorage();
export default singleUpload = multer({ storage }).single("file");

