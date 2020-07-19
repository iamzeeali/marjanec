const express = require("express");
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require("sharp");
var path = require("path");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");

router.post("/signup", authController.signup);

router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);

// Update Me
router.route("/updateMe").patch(
  catchAsync(async (req, res, next) => {
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

    const {
      firstName,
      lastName,
      email,
      username,
      address,
      phone,
      image,
    } = req.body;

    const doc = await User.findByIdAndUpdate(req.user.id, {
      firstName,
      lastName,
      username,
      email,
      address,
      phone,
      new: true,
      runValidators: true,
      image: req.file ? req.file.filename : image,
    });

    if (req.fileValidationError) {
      console.log("Invalid File type Only Image file Accepted");
      return res.status(400).send({
        msg: "Invalid File type Only Image file Accepted",
        success: false,
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user: doc,
      },
    });

    res.status(500).send(err);
  })
);

router.delete("/deleteMe", userController.deleteMe);

router
  .route("/")
  .get(authController.restrictTo("admin", "user"), userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/totalno")
  .get(authController.restrictTo("admin"), userController.getAllTotalUser);

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
