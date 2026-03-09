import multer from "multer";

const getfilename = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: getfilename });
export default upload;
