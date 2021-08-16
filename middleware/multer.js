const multer = require("multer");
const path = require("path");
const fs = require("fs");
// import uuid from "uuid/v4";

//////////////////////////////////// PITCHDECK /////////////////////////////////
const storagePitchdeck = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = 'public/image/pitchdeck';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadPitchdeck = multer({
  storage: storagePitchdeck,
  limits: { fileSize: 50000000 }, // 2 mb
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array("image", 12);

//////////////////////////////////// Online PITCH /////////////////////////
const storageOnlinePitch = multer.diskStorage({
  destination: "public/image/onlinePitch/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upLoadOnlinePitch = multer({
  storage: storageOnlinePitch,
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

//////////////////////////////////// USER /////////////////////////////////
const storageUser = multer.diskStorage({
  destination: "public/image/user/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadUser = multer({
  storage: storageUser,
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

// STORAGE FUNCTION
const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = 'public/image/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadMultiple = multer({
  storage: storageMultiple,
  limits: { fileSize: 2000000 }, // 2 mb
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array("image", 12);

///////////////////////////////////////////////// PITCH /////////////////////////////////////////
const storageMultiplePitch = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = 'public/image/pitch/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  }
})

const uploadPitch = multer({
  storage: storageMultiplePitch,
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array("file")


///////////////////////////////////////////////// NEWS /////////////////////////////////////////
const storageMultipleNews = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = 'public/image/newstech/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  }
})

const uploadNews = multer({
  storage: storageMultipleNews,
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array("image", 12);

// const uploadNewsHeadline = multer({
//   storage: storageMultipleNews,
//   limits: { fileSize: 2000000 }, // 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).array("imageHeadline",12);

///////////////////////////////////////////////// SLIDER /////////////////////////////////////////
const storageSlider = multer.diskStorage({
  destination: "public/image/slider/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadSlider = multer({
  storage: storageSlider,
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");


///////////////////////////////////////////////// TEAMS /////////////////////////////////////////
const storageTeams = multer.diskStorage({
  destination: "public/image/teams/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadTeams = multer({
  storage: storageTeams,
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

///////////////////////////////////////////////// CHECK FILE /////////////////////////////////////////
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif|pdf/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = {
  uploadMultiple,
  uploadSlider,
  uploadNews,
  uploadPitch,
  uploadTeams,
  uploadUser,
  uploadPitchdeck,
  upLoadOnlinePitch
};