const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
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
  // expenseBy: {
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

  expenseBy: {
    type: String,
    required: [true, "Expense by missing"],
  },

  date: {
    type: Date,
    required: [true, "Expense must have a Date."],
  },

  image: {
    type: String,
  },
  //imageId: String,

  purpose: {
    type: String,
    // required: [true, "Must be Currency Type"]
  },
  convAmt: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

expenseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "project",
    select: " projectName customerName startDate  endDate",
  }).populate({
    path: "user",
  });
  next();
});

module.exports = Expense = mongoose.model("Expense", expenseSchema);
