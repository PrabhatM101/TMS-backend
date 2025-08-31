const mongoose = require("mongoose");
const { apiResponse } = require("./apiResponse");

module.exports = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send(apiResponse(400, null, `Invalid ${paramName}`));
    }
    next();
  };
};
