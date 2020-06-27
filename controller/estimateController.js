const Estimate = require("../model/estimateModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");


//exports.createEstimate = factory.createOne(Estimate);
exports.getAllEstimates = factory.getAll(Estimate);
exports.getEstimate = factory.getOne(Estimate);
exports.updateEstimate = factory.updateOne(Estimate);
exports.deleteEstimate = factory.deleteOne(Estimate);


exports.createEstimate = catchAsync(async (req, res, next) => {
  const {
    project,
    estimated_amount,
    desc,
    date
  } = req.body;
  const { username, email } = req.user;

  const receiverOutput = `
      <h3><u> Project Estimate Amount Alert By</u></h3>
      <ul>
        <li>Name: ${username}</li>
        <li>Email: ${email}</li>
      </ul>
      <h3><u>Project Name:</u></h3>
      <p>${project}</p>
    <ul>
      <li>Guys We Have to Collect Amount $ ${estimated_amount} for This Project Within ${date ? date : ""}. So Please Invest Your Capital As soon as Possible</li>
      <li></li>
  
    </ul>`;

  const senderOutput = `
    <p>Your new project Estimated Amount request has been sent to all successfully.</p>

    <h3><u>Project Estimate Amount Alert By</u></h3>
    <ul>
      <li>Name: ${username}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3><u>Project Name:</u></h3>
    <p>${project}</p>
  <ul>
    <li>Guys We Have to Collect Amount $ ${estimated_amount} for This Project Within ${date ? date : ""}. So Please Invest Your Capital As soon as Possible</li>
    <li></li>

    <small>Please ignore this email if it's not meant for you. Thank you.</small>`;

  try {
    // const doc = await Estimate.create(req.body);
    let maillist = ["kamran@globuslabs.com", "zeeshan.globuslabs@gmail.com"];

    const newEstimate = new Estimate({
      project,
      estimated_amount,
      date,
      desc,
      user: req.user.id
    });
    const doc = await newEstimate.save();

    await sendEmail({
      to: maillist,
      subject: `New Project Estimation Alert Reciver`,
      output: receiverOutput
    });
    await sendEmail({
      to: email,
      subject: `New Project Estimation Alert Sender`,
      output: senderOutput
    });
    res.status(200).json({
      status: "success",
      data: doc,
      message: "Email sent successfully!"
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError("There was an error sending email. Try again later!"),
      500
    );
  }
});


//Get Estimates
// exports.getUserEstimates = catchAsync(async (req, res, next) => {
//     const features = await new APIFeatures(
//         Estimate.find({ user: req.user.id }),
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

