const User = require("../models/user.model");
const LoginHistory = require("../models/loginHistory.model");
const jwt = require("jsonwebtoken");
const { apiResponse } = require("../middlewares/apiResponse");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isTrashed: false });
    if (!user) {
      return res
        .status(400)
        .send(apiResponse(400, null, "User not found! Sign up to continue"));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .send(apiResponse(400, null, "Invalid email or password"));
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await LoginHistory.create({
      userID: user._id,
      token,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.send(
      apiResponse(
        200,
        { token, _id: user._id, name: user.name, email: user.email },
        "Login successful"
      )
    );
  } catch (err) {
    next(err);
  }
};


exports.logout = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send(apiResponse(401, null, "No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const history = await LoginHistory.findOne({ userId: decoded.id, token, isTrashed: false });
    if (!history) {
      return res.status(401).send(apiResponse(401, null, "Invalid or expired token"));
    }

    if (history.loggedOutAt) {
      return res.status(400).send(apiResponse(400, null, "Already logged out"));
    }

    history.loggedOutAt = new Date();
    await history.save();

    res.send(apiResponse(200, null, "Logout successful"));
  } catch (err) {
    next(err);
  }
};
