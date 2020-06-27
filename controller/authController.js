const { promisify } = require("util");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

// Register NewUser
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.json({ newUser });
    next();

    //3. if everything is ok, send token to client
    const payload = {
        user: {
            id: user.id
        }
    };
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
            if (err) throw err;
            res.json({ token });

        }
    );
});

// Login User
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1. Check if email and password exist
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    //2. check if user exist and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //3. if everything is ok, send token to client

    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
            if (err) throw err;
            res.json({ token });

        }
    );
});


exports.protect = catchAsync(async function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return next(
            new AppError("You are not logged in! Please login to get access", 401)
        );
    }
    //2. Verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3. Check if user still exists
    const currentUser = await User.findById(decoded.user.id);

    if (!currentUser) {
        return next(
            new AppError(
                "Theuser belonging to this token does no longer exist.",
                401
            )
        );
    }

    //4. Check ifuser changed passwords after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError("User recently changed password! Please login again", 401)
        );
    }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }

        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    //1. Getuser based on posted email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError(`There is nouser with email address`, 404));
    }

    //2. Generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //3. send it touser's email
    const resetURL = `${req.protocol}://${req.get(
        "host"
    )}/api/user/resetPassword/${resetToken}}`;

    const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to ${resetURL}.\nIf you didn't forgot your password, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message
        });
        res.status(200).json({
            status: "success",
            message: "Token sent to email!"
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(
            new AppError("There was an error sending email. Try again later!"),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Getuser based on the token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //3. Update changedPasswordAt property for theuser

    //4. Log theuser in, send JWT
    //createSendToken(user, 200, res);
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
            if (err) throw err;
            res.json({ token });

        }
    );

});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Getuser from collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    //User.findByIdAndUpdate will NOT work as intended!

    // 4) Loguser in, send JWT
    //createSendToken(user, 200, res);
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
            if (err) throw err;
            res.json({ token });

        }
    );

});
