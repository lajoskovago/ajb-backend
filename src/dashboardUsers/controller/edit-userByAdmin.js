const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../../authentication/model/user-model");

exports.updateUser = () => async (req, res, next) => {
  {
    const hashConst = 10;
    const { _id } = req.body;
    const userData = req.body;

    const validationId = mongoose.Types.ObjectId.isValid(_id);
    if (!validationId) {
      return res.status(400).json({
        error: "Sorry, but provided id is inccorect!",
        data: [],
      });
    } else {
      const foundUser = await UserModel.findOne({ _id });
      if (!foundUser) {
        return res.status(400).json({
          error: "Sorry, this user doesn't exist in the database!",
          data: [],
        });
      } else {
// Here we have a conditional block that checks if the edited mail exists in the database and if the password has been changed it will be encrypted and sent like this.
        
        if (userData.password || userData.email) {
          if(userData.password && userData.email){
            userData.password = await bcrypt.hash(userData.password, hashConst);
            const foundEmail = await UserModel.findOne({
              email: userData.email,
            });
            if (foundEmail && foundEmail._id!=_id) {
              req.warrning = `Provided email(${userData.email}) is already used by another account, but the rest of the data was saved. Please try another one`;
              userData.email = foundUser.email;
            }
          }
          if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, hashConst);
          } else {
            const foundEmail = await UserModel.findOne({
              email: userData.email,
            });
            if (foundEmail && foundEmail._id!=_id) {
              req.warrning = `Provided email(${userData.email}) is already used by another account, but the rest of the data was saved. Please try another one.`;
              userData.email = foundUser.email;
            }
          }
        }

        await UserModel.findByIdAndUpdate({ _id }, userData);
        next();
      }
    }
  }
};
