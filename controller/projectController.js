const Project = require("../model/projectModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");


//exports.createProject = factory.createOne(Project);
exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);



//Get Project
// exports.getUserProjects = catchAsync(async (req, res, next) => {
//     const features = await new APIFeatures(
//         Project.find({ user: req.user.id }),
//         req.query
//     )
//         .sort()
//         .paginate();
//     const docs = await features.query;
//     res.status(200).json({
//         status: "success",
//         result: docs.length,
//         data: docs
//     });
// });


// Post Project

exports.createProject = catchAsync(async (req, res, next) => {
    const { projectName, customerName, startDate, endDate, user } = req.body;
    try {
        const newProject = new Project({
            projectName, customerName, startDate, endDate,
            user: req.user.id
        });

        const doc = await newProject.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})

