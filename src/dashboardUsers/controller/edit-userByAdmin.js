require("../../authentication/controller/passport-config");

var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../../authentication/model/user-model");

exports.updateAnUser = () => async (req, res, next) => {
  {
    const hashConst = 10;
    var obj = {};

    const id = mongoose.Types.ObjectId.isValid(req.body._id);
    if (!id) {
      return res.status(400).json({
        error: "Sorry, but your id is inccorect!",
        data: [],
      });
    } else {
      const keys = ["name", "firstname", "phone", "role", "password"];

      for (var itemsFromBodyIndex in req.body) {
        if (keys.includes(itemsFromBodyIndex)) {
          if (itemsFromBodyIndex == "password") {
            const passwordHash = await bcrypt.hash(
              itemsFromBodyIndex,
              hashConst
            );
            obj[itemsFromBodyIndex] = passwordHash;
          } else {
            obj[itemsFromBodyIndex] = req.body[itemsFromBodyIndex];
          }
        }
      }

      const { _id } = req.body;
      const foundUser = await UserModel.findOne({ _id });
      if (!foundUser) {
        return res
          .status(400)
          .json({
            error: "Sorry, this user no longer exists in the database",
            data: []
          });
      } else {
        await UserModel.findByIdAndUpdate({ _id }, obj);
        next();
      }
    }
  }
  req, res;
};
