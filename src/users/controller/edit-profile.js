const UserModel = require("../../authentication/model/user-model");

exports.updateProfile = async (req, res, next) => {
  const userData = req.body;
  const email = req.userEmail;
  
  const foundUser = await UserModel.findOne({email});
  if (!foundUser) {
    return res.status(400).json({
      error: "Sorry, your data cannot be accessed!",
      data: []
    });
  } else {
    await UserModel.findOneAndUpdate({email}, userData);
    next();
  }

};
