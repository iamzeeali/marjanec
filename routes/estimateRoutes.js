const express = require("express");
const estimateController = require("./../controller/estimateController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
    .route("/")
    .get(estimateController.getAllEstimates)
    .post(estimateController.createEstimate);

// router
//     .route("/getAll")
//     .get(estimateController.getAllEstimates)

router
    .route("/:id")
    .get(estimateController.getEstimate)
    .patch(estimateController.updateEstimate)
    .delete(estimateController.deleteEstimate);

module.exports = router;
