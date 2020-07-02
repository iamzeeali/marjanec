const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  firstName: { type: String },
  projectName: { type: String },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: [true, "There must be a project Name"],
  },

  //project: [Project],
  // investedBy: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User"

  // },

  amount: {
    type: Number,
    required: [true, "There Must be Investing Amount"],
  },

  currency: {
    type: String,
    required: [true, "There Must be Currency Type"],
  },
  investBy: {
    type: String,
    required: [true, "Invest by missing"],
  },

  date: {
    type: Date,
    required: [true, "Investment must have a Date."],
  },

  image: {
    type: String,
  },
  // imageId: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  convAmt: {
    type: Number,
  },
});

investmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "project",
    select: " projectName customerName startDate  endDate ",
  }).populate({
    path: "user",
  });
  next();
});

module.exports = Investment = mongoose.model("Investment", investmentSchema);

// $match: {
//     project: `${project}`
// },
