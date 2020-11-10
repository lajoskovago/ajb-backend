require("dotenv").config({ path: "./src/config/.env" });
require("../../authentication/controller/passport-config");

const passport = require("passport");
const UserModel = require("../../authentication/model/user-model");

exports.getProfile = async (req, res, next) => {
      var email = {};
      email.email = req.userEmail;
      const foundUser = await UserModel.findOne(email);

      if (!foundUser) {
        return res.status(400).json({
          error : "Sorry, your data cannot be accessed",
          data : []
        });
      } else {
        (req.name = foundUser.name),
          (req.firstname = foundUser.firstname),
          (req.email = foundUser.email),
          (req.phone = foundUser.phone),
          (req.role = foundUser.role),
          next();
      }
    
  (req, res);
};
