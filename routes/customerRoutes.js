const express = require("express");
const customerController = require("./../controller/customerController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require('sharp');
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require('path');
const Customer = require('../model/customerModel')

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 1
    }, fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return cb(new Error("Only image files are accepted!"), false);
        }
        cb(null, true);

    }
});


const resizeReciptPhoto = (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `CustProf-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
        .resize(1000, 1000, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(path.join(__dirname, `../public/uploads/profile/${req.file.filename}`));
    next();
}

// Post Customer

router.route("/").post(authController.restrictTo('user', 'admin'), upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { name, address, email, phone, image, } = req.body;
    try {
        const newCustomer = new Customer({
            name, address, email, phone,
            user: req.user.id,
            image: req.file ? req.file.filename : image,

        });

        const doc = newCustomer.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        if (req.fileValidationError) {
            console.log("Invalid File type Only Image file Accepted");
            return res.status(400).send({
                msg: "Invalid File type Only Image file Accepted",
                success: false
            });

        }
        res.status(500).send(err);
    }

}));


// Update Customer

router.route("/:id").patch(authController.restrictTo('admin'), upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { name, address, email, phone, image, } = req.body;

    const doc = await Customer.findByIdAndUpdate(req.params.id, {
        name, address, email, phone,
        new: true,
        runValidators: true,
        user: req.user.id,
        image: req.file ? req.file.filename : image,
    });

    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    if (req.fileValidationError) {
        console.log("Invalid File type Only Image file Accepted");
        return res.status(400).send({
            msg: "Invalid File type Only Image file Accepted",
            success: false
        });

    }
    res.status(200).json({
        status: "success",
        doc
    });

}))


router
    .route("/")
    .get(authController.restrictTo('admin'), customerController.getAllCustomers)


router
    .route("/getAll")
    .get(authController.restrictTo('admin'), customerController.getAllCustomers)

router
    .route("/:id")
    .get(authController.restrictTo('admin'), customerController.getCustomer)
    //.patch(customerController.updateCustomer)
    .delete(authController.restrictTo('admin'), customerController.deleteCustomer);

module.exports = router;
