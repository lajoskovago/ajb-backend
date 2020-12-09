require("../../authentication/controller/passport-config");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../../authentication/model/user-model");

exports.updateUser = () => async (req, res, next) => {
  {
    const hashConst = 10;
    const obj = {};

    const validationId = mongoose.Types.ObjectId.isValid(req.body._id);
    if (!validationId) {
      return res.status(400).json({
        error: "Sorry, but provided id is inccorect!",
        data: [],
      });
    } else {
      const keys = ["firstname", "lastname", "phone", "role", "password"];

      for (let itemsFromBodyIndex in req.body) {
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
            error: "Sorry, this user doesn't exists in the database!",
            data: []
          });
      } else {
        await UserModel.findByIdAndUpdate({ _id }, obj);
        next();
      }
    }
  }
};