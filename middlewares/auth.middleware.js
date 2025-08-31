const jwt = require("jsonwebtoken");
const LoginHistory = require("../models/loginHistory.model");
const { apiResponse } = require("./apiResponse");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .send(apiResponse(401, { isLogoutRequired: true }, "No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const session = await LoginHistory.findOne({ userId: decoded.id, token });
    if (!session || session.isTrashed || session.loggedOutAt) {
      return res
        .status(401)
        .send(apiResponse(401, { isLogoutRequired: true }, "Session expired or logged out"));
    }
    req.params.tenant = decoded?._id;
    req.user = decoded;
    req.token = token;
    next();
  } catch {
    return res
      .status(401)
      .send(apiResponse(401, { isLogoutRequired: true }, "Invalid or expired token"));
  }
};
