require("../../authentication/controller/passport-config");

const UserModel = require("../../authentication/model/user-model");

exports.updateProfile = async (req, res, next) => {
  const obj = {};
  const email = {};
  email.email = req.userEmail;
  const keys = ["firstname", "lastname", "phone"];

  for (let itemsFromBodyIndex in req.body) {
    if (keys.includes(itemsFromBodyIndex)) {
      obj[itemsFromBodyIndex] = req.body[itemsFromBodyIndex];
    }
  }
  const foundUser = await UserModel.findOne(email);
  if (!foundUser) {
    return res.status(400).json({
      error: "Sorry, your data cannot be accessed!",
      data: []
    });
  } else {
    await UserModel.findOneAndUpdate(email, obj);
    next();
  }

};
