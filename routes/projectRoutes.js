const express = require("express");
const projectController = require("./../controller/projectController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization

router
  .route("/")
  .get(
    authController.restrictTo("admin", "user"),
    projectController.getAllProjects
  )
  .post(
    authController.restrictTo("user", "admin"),
    projectController.createProject
  );

router
  .route("/getAll")
  .get(
    authController.restrictTo("user", "admin"),
    projectController.getAllProjects
  );

router
  .route("/:id")
  .get(authController.restrictTo("user", "admin"), projectController.getProject)
  .patch(
    authController.restrictTo("user", "admin"),
    projectController.updateProject
  )
  .delete(
    authController.restrictTo("user", "admin"),
    projectController.deleteProject
  );

module.exports = router;
