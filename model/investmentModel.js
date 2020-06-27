const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },

    username: { type: String },
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
        required: [true, "Must be Investing Amount"]
    },

    currency: {
        type: String,
        required: [true, "Must be Currency Type"]
    },

    date: {
        type: Date,
        required: [true, "Investment must have a Date."]
    },

    image: {
        type: String,
    },
    // imageId: String,

    createdAt: {
        type: Date,
        default: Date.now
    },
    convAmt: {
        type: Number
    }

});

investmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "project",
        select: " projectName customerName startDate  endDate "
    }).populate({
        path: "user",

    });
    next();
});

module.exports = Investment = mongoose.model("Investment", investmentSchema);

// $match: {
//     project: `${project}`
// },