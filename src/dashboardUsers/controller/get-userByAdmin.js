const UserModel = require("../../authentication/model/user-model");

exports.getUser = () => async (req, res, next) => {
  const { email } = req.body;
  const user = {};

  if (!email) {
    return res.status(400).json({
      error: "Sorry, but email is required!",
      data: [],
    });
  }
  const foundUser = await (await UserModel.findOne({ email })).toObject();

  if (!foundUser) {
    return res.status(400).json({
      error: "Sorry, but the user cannot be found!",
      data: [],
    });
  } else {
      user.id = foundUser._id,
      user.firstname = foundUser.firstname,
      user.lastname = foundUser.lastname,
      user.email = foundUser.email,
      user.phone = foundUser.phone,
      user.role = foundUser.role,

      req.user = user;
      
    next();
  }
};
