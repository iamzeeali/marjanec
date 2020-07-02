const express = require("express");
const investmentController = require("./../controller/investmentController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");

//const pdf = require('html-pdf');
//const invmonthPdf = require('../documentPDF/investMonth.js');

const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require("path");
const Investment = require("../model/investmentModel");

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization

router
  .route("/getAll")
  .get(
    authController.restrictTo("admin"),
    investmentController.getAllInvestments
  );
router
  .route("/total/:id")
  .get(
    authController.restrictTo("admin"),
    investmentController.getTotalInvestments
  );

router
  .route("/Usertotal/:id")
  .get(
    authController.restrictTo("admin"),
    investmentController.getUsersTotalInvestments
  );
router
  .route("/monthTotal/:year")
  .get(
    authController.restrictTo("admin"),
    investmentController.getMonthInvestments
  );
router
  .route("/usermonthTotal/:year/:id")
  .get(
    authController.restrictTo("admin"),
    investmentController.getUserMonthInvestments
  );
router
  .route("/filter/:id")
  .get(
    authController.restrictTo("admin"),
    investmentController.getFilteredInvestments
  );

//----DOWNLOAD PDF------

// //--------PDF DOWNLOAD ROUTE---------

// var option = { "format": "A1", "orientation": "portrait" };

// //"height": "182mm", "width": "231mm", "orientation": "landscape",
// // POST--PDF Generation and fetching the dynamic data
// router.route('/create-inv').post(authController.restrictTo('admin'), (req, res) => {
//     pdf.create(invmonthPdf(req.body), option).toFile("result.pdf", err => {
//         if (err) {
//             res.send(Promise.reject());
//         }
//         res.send(Promise.resolve());
//     });
// });

// GET-- Send the generated PDF to the Client
// router.route("/fetch-inv").get(authController.restrictTo('admin'), (req, res) => {
//     res.sendFile(`../result.pdf`);
// });

// Image saved on memmory for image porcessing
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error("Only image files are accepted!"), false);
    }
    cb(null, true);
  },
});

const resizeReceiptPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `InvReceipt-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(1000, 1000, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(path.join(__dirname, `../public/uploads/${req.file.filename}`));
  next();
};

// Post Investment

router.route("/").post(
  authController.restrictTo("admin", "user"),
  upload.single("image"),
  resizeReceiptPhoto,
  catchAsync(async (req, res, next) => {
    const {
      project,
      amount,
      currency,
      date,
      convAmt,
      investBy,
      image,
      projectName,
    } = req.body;
    try {
      const newInvestment = new Investment({
        project,
        amount,
        currency,
        date,
        convAmt,
        projectName,
        investBy,
        user: req.user.id,
        firstName: req.user.firstName,
        image: req.file ? req.file.filename : image,
      });

      const doc = newInvestment.save();
      res.status(200).json({
        status: "success",
        doc,
      });
    } catch (err) {
      if (req.fileValidationError) {
        console.log("Invalid File type Only Image file Accepted");
        return res.status(400).send({
          msg: "Invalid File type Only Image file Accepted",
          success: false,
        });
      }
      res.status(500).send(err);
    }
  })
);

// Update Investment

router.route("/:id").patch(
  authController.restrictTo("admin", "user"),
  upload.single("image"),
  resizeReceiptPhoto,
  catchAsync(async (req, res, next) => {
    const {
      project,
      amount,
      currency,
      date,
      convAmt,
      investBy,
      image,
      projectName,
    } = req.body;

    const doc = await Investment.findByIdAndUpdate(req.params.id, {
      project,
      amount,
      currency,
      date,
      convAmt,
      investBy,
      projectName,
      new: true,
      runValidators: true,
      user: req.user.id,
      firstName: req.user.firstName,
      image: req.file ? req.file.filename : image,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    if (req.fileValidationError) {
      console.log("Invalid File type Only Image file Accepted");
      return res.status(400).send({
        msg: "Invalid File type Only Image file Accepted",
        success: false,
      });
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  })
);

//Restrict all router after this middleware to admin only- Authorization
router
  .route("/getOverAllSum")
  .get(
    authController.restrictTo("admin", "user"),
    investmentController.getOverAllSumInvestments
  );

//Restrict all router after this middleware to admin only- Authorization
router
  .route("/")
  .get(
    authController.restrictTo("user", "admin"),
    investmentController.getUserInvestments
  );

router
  .route("/:id")
  .get(
    authController.restrictTo("user", "admin"),
    investmentController.getInvestment
  )
  .delete(
    authController.restrictTo("user", "admin"),
    investmentController.deleteInvestment
  );

module.exports = router;
