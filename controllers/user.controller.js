const { apiResponse } = require("../middlewares/apiResponse");
const User = require("../models/user.model");

exports.registerUser = async (req, res,next) => {
  try {
    const existing = await User.findOne({ email: req.body.email,isTrashed:false });
    if (existing) return res.status(400).json({ message: "Email already exists",status:400 });

    const user = new User(req.body);
    await user.save();

    res.status(201).send(apiResponse(201,{_id:user?._id}, "User registered successfully"));
  } catch (err) {
    next(err)
  }
};

exports.getUserById = async (req, res,next) => {
  try {
    const user = await User.findOne({_id:req.params.id,isTrashed:false}).select("name email");
    if (!user) return res.status(404).send({ message: "User not found" });
    if (user?._id?.toString()!==req.params.tenant) return res.status(403).send({ status:403,message: "Unauthorised request!" });
    res.send(apiResponse(200,user));
  } catch (err) {
    next(err)
  }
};

exports.updateUser = async (req, res,next) => {
  try {
    let user = await User.findOne({_id:req.params.id,isTrashed:false}).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user?._id?.toString()!==req.params.tenant) return res.status(403).send({ status:403,message: "Unauthorised request!" });

    user = await User.findOneAndUpdate({_id:req.params.id,isTrashed:false},{$set:{
      name:req.body.name
    }},{new:true}).select("name email")
    
    res.send(apiResponse(200,user, "User updated successfully" ));
  } catch (err) {
    next(err)
  }
};

exports.deleteUser = async (req, res,next) => {
  try {
     let user = await User.findOne({_id:req.params.id,isTrashed:false}).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user?._id?.toString()!==req.params.tenant) return res.status(403).send({ status:403,message: "Unauthorised request!" });


     user = await User.findOneAndUpdate(
      {_id:req.params.id,isTrashed:false},
      { $set:{ isTrashed: true }},
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.send(apiResponse(200,null, "User deleted successfully" ));
  } catch (err) {
    next(ex)
  }
};
