const express = require("express");
const customerPayController = require("./../controller/customerPayController.js");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization



router
    .route("/getAll")
    .get(authController.restrictTo('admin'), customerPayController.getAllCustomerPays)
router
    .route("/getOverAllSum")
    .get(authController.restrictTo('admin', 'user'), customerPayController.getOverAllSumCustomerPay)
router
    .route("/total/:id")
    .get(authController.restrictTo('admin'), customerPayController.getTotalCustPay)

router
    .route("/monthTotal/:year")
    .get(authController.restrictTo('admin'), customerPayController.getMonthCustomerPays)
router
    .route("/usermonthTotal/:year/:id")
    .get(authController.restrictTo('admin'), customerPayController.getMonthUserCustPay)

router
    .route("/filter/:id")
    .get(authController.restrictTo('admin'), customerPayController.getFilteredCustPay)

router
    .route("/custTotal/:id")
    .get(authController.restrictTo('admin'), customerPayController.getCustomerTotalPay)

router
    .route("/:id")
    .get(authController.restrictTo('admin', 'user'), customerPayController.getCustomerPay)
    .patch(authController.restrictTo('admin', 'user'), customerPayController.updateCustomerPay)
    .delete(authController.restrictTo('admin', 'user'), customerPayController.deleteCustomerPay);

router
    .route("/")
    .get(authController.restrictTo('admin', 'user'), customerPayController.getUserCustomerPays)
    .post(authController.restrictTo('admin', 'user'), customerPayController.createCustomerPay);

module.exports = router;
