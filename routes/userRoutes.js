const express = require("express");
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require('sharp');
var path = require('path');
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

//router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);



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
    req.file.filename = `Profile-${Date.now()}.jpeg`;

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


// Register NewUser
router.route("/signup").post(upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {


    const { firstName, lastName, email, username, image, address, password, passwordConfirm } = req.body;
    try {
        const newUser = new User({
            firstName, lastName, email, username, password, address, passwordConfirm,
            image: req.file ? req.file.filename : image,
        });

        const doc = newUser.save();
        res.json({ newUser });
        next();
        //3. if everything is ok, send token to client
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (err, token) => {
                if (err) throw err;
                res.json({ token });

            }
        );
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


//Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);

const resizePhoto = (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `Profile-${Date.now()}.jpeg`;

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

// Update Me
router.route("/updateMe").patch(upload.single("image"), resizePhoto, catchAsync(async (req, res, next) => {

    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                "This route is not for password updates. Please use /updateMyPassword.",
                403
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated

    const { firstName, lastName, email, username, address, phone, image } = req.body

    const doc = await User.findByIdAndUpdate(req.user.id, {
        firstName, lastName, username, email, address, phone,
        new: true,
        runValidators: true,
        image: req.file ? req.file.filename : image,
    });

    if (req.fileValidationError) {
        console.log("Invalid File type Only Image file Accepted");
        return res.status(400).send({
            msg: "Invalid File type Only Image file Accepted",
            success: false
        });

    }
    res.status(200).json({
        status: "success",
        data: {
            user: doc
        }
    });

    res.status(500).send(err);
}));


router.delete("/deleteMe", userController.deleteMe);


router
    .route("/")
    .get(authController.restrictTo("admin"), userController.getAllUsers)
    .post(userController.createUser);

router.route('/totalno').get(authController.restrictTo("admin"), userController.getAllTotalUser)



//Restrict all router after this middleware to admin only

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;


// const filteredBody = filterObj(req.body, req.body.image, "firstName", "lastName", "email", "username", "phone", "address");

// const doc = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//     image: req.file ? req.file.filename : req.body.image,
// });
