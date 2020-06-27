const CustomerPay = require("../model/customerPayModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");
const ObjectId = require('mongodb').ObjectID

//exports.createCustomerPay = factory.createOne(CustomerPay);
exports.getAllCustomerPays = factory.getAll(CustomerPay);
exports.getCustomerPay = factory.getOne(CustomerPay);
exports.updateCustomerPay = factory.updateOne(CustomerPay);
exports.deleteCustomerPay = factory.deleteOne(CustomerPay);



//Get User Wise CustomerPay
exports.getUserCustomerPays = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.find({ user: req.user.id }),
        req.query
    )
        .sort()
        .paginate();
    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});

// Get Sum of Over-All Customer Paymnet
exports.getOverAllSumCustomerPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(

        CustomerPay.aggregate([

            {
                $group: {
                    _id: null,
                    totalCustPay: { $sum: "$convAmt" },
                }
            },
        ]),
        req.query
    )
        .paginate()

    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});


// Post Add CustomerPay

exports.createCustomerPay = catchAsync(async (req, res, next) => {
    const { project, customer, invoiceNo, amount, currency, convAmt, date, username, projectName } = req.body;
    try {
        const newCustomerPay = new CustomerPay({
            project, customer, invoiceNo, amount, currency, convAmt, date, username, projectName,
            user: req.user.id

        });

        const doc = await newCustomerPay.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})


//Get Project Based  Filtered Customer Payment
exports.getFilteredCustPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.find({ project: req.params.id }),
        req.query
    )
        .filter()
        .sort()
        .paginate();
    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});


//Get Project Based Total Customer Payment
exports.getTotalCustPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.aggregate([

            {
                $match: {
                    project: new ObjectId(req.params.id)
                },
            },
            {
                $group: {
                    _id: '$project',
                    no_of_investment: {
                        $sum: 1
                    },
                    totalAmount: { $sum: "$convAmt" },
                    project: {
                        $push: '$project'
                    },

                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: "project",
                    foreignField: "_id",
                    "as": 'projects_docs'
                },

            },

        ]),

        req.query
    )

        .sort()
        .paginate()

    const docs = await features.query;
    res.status(200).json({

        status: "success",
        result: docs.length,
        data: docs
    });
});



//Get Customet Based Total  Payment
exports.getCustomerTotalPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.aggregate([

            {
                $match: {
                    customer: new ObjectId(req.params.id)
                },
            },

            {
                $group: {
                    _id: '$customer',
                    no_of_investment: {
                        $sum: 1
                    },
                    totalAmount: { $sum: "$convAmt" },

                },
            },
        ]),

        req.query
    )

        .sort()
        .paginate()

    const docs = await features.query;
    res.status(200).json({

        status: "success",
        result: docs.length,
        data: docs
    });
});


//Get Month Wise Customerpay
exports.getMonthCustomerPays = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;
    const features = await new APIFeatures(

        CustomerPay.aggregate([

            {
                $project: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    _id: 1,
                    convAmt: 1
                },
            }, {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    totalCustPayMonthy: { $sum: "$convAmt" },
                    amount: {
                        $push: '$convAmt',
                        //$push: "$user"
                    },
                }
            }, { $sort: { _id: 1 } }, {
                $lookup: {
                    from: 'customerpays',
                    foreignField: "convAmt",
                    localField: "amount",
                    "as": 'custpay_docs'
                },

            },
            {
                $match: {
                    "_id.year": year,
                    // "_id.month": 2
                }
            },


        ]),
        req.query
    )
        .sort()
        .paginate();
    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});


//Get Month Wise User Customerpay
exports.getMonthUserCustPay = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;
    const features = await new APIFeatures(

        CustomerPay.aggregate([

            {
                $project: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    _id: 1,
                    convAmt: 1,
                    customer: 1,
                },
            },
            {
                $match: {
                    customer: new ObjectId(req.params.id)
                },

            }, {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    totalCustPayMonthy: { $sum: "$convAmt" },
                    amount: {
                        $push: '$convAmt',
                        //$push: "$user"
                    },
                }
            }, {
                $sort: { _id: 1 }
            }, {
                $lookup: {
                    from: 'customerpays',
                    foreignField: "convAmt",
                    localField: "amount",
                    "as": 'custpay_docs'
                },

            },
            {
                $match: {
                    "_id.year": year,
                    // "_id.month": 2
                }
            },


        ]),
        req.query
    )
        .sort()
        .paginate();
    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});

