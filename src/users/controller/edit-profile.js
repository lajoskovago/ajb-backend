require("dotenv").config({ path: "./src/config/.env" });
require("../../authentication/controller/passport-config");

const passport = require("passport");
const UserModel = require("../../authentication/model/user-model");

exports.updateProfile = async (req, res, next) => {
  var obj = {};
  var email = {};
  email.email = req.userEmail;
  const keys = ["name", "firstname", "phone"];

  for (var itemsFromBodyIndex in req.body) {
    if (keys.includes(itemsFromBodyIndex)) {
      obj[itemsFromBodyIndex] = req.body[itemsFromBodyIndex];
    }
  }
  const foundUser = await UserModel.findOne(email);
  if (!foundUser) {
    return res.status(400).json({
      error: "Sorry, your data cannot be accessed",
      data: []
    });
  } else {
    await UserModel.findOneAndUpdate(email, obj);
    next();
  }

  req, res;
};
