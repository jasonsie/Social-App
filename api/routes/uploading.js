const router = require("express").Router();
const User = require("../models/User.js");
const multer = require("multer");

// WHERE & HOW : storing to where & name of file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/upload");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

// const fileFilter = (req, res, cb) => {
//     if (
//         req.file.mimetype === "image/jpeg" ||
//         req.file.mimetype === "image/jpg" ||
//         req.file.mimetype === "image/png"
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    // fileFilter:fileFilter
});

router.post("/uploading", upload.single("file"), async (req, res) => {
    console.log(req.file);
    try {
        await res.status(200).json("Uploading successfully");
    } catch (ereor) {
        return res.status(500).json(ereor);
    }
});

module.exports = router;

// req.file:
// {
//     fieldname: 'file',
//     originalname: '8.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/images/upload',
//     filename: 'f727e54fc462b34805ac40f6f99f72ee',
//     path: 'public/images/upload/f727e54fc462b34805ac40f6f99f72ee',
//     size: 213017
//   }
