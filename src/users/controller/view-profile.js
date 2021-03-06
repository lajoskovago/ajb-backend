const UserModel = require("../../authentication/model/user-model");

exports.getProfile = async (req, res, next) => {
      
      const email = req.userEmail;
      const foundUser = await UserModel.findOne({email});

      if (!foundUser) {
        return res.status(400).json({
          error : "Sorry, your data cannot be accessed!",
          data : []
        });
      } else {
          req.firstname = foundUser.firstname,
          req.lastname = foundUser.lastname,
          req.email = foundUser.email,
          req.phone = foundUser.phone,
          req.role = foundUser.role,
          next();
        }
};
