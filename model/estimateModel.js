const mongoose = require("mongoose");


const estimateSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },

    project: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: [true, "There must be a project Name"],

    },

    estimated_amount: {
        type: Number,
        required: [true, "Must be Investing Amount"]
    },
    desc: {
        type: String,
    },

    // currency: {
    //     type: String,
    //     required: [true, "Must be Currency Type"]
    // },

    date: {
        type: String,
        required: [true, "Estimate must have a Date."]
    },

    // convAmt: {
    //     type: Number
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

estimateSchema.pre(/^find/, function (next) {
    this.populate({
        path: "project",
        select: " projectName customerName startDate  endDate "
    }).populate({
        path: "user",

    });
    next();
});

module.exports = Estimate = mongoose.model("Estimate", estimateSchema);
