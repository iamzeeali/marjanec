const Customer = require("../model/customerModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");


//exports.createCustomer = factory.createOne(Customer);
exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);



//Get Customer
// exports.getUserCustomers = catchAsync(async (req, res, next) => {
//     const features = await new APIFeatures(
//         Customer.find({ user: req.user.id }),
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


// Post Customer

exports.createCustomer = catchAsync(async (req, res, next) => {
    const { name, email, address, phone } = req.body;
    try {
        const newCustomer = new Customer({
            name, email, address, phone,
            user: req.user.id
        });

        const doc = await newCustomer.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})

