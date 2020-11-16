require("../../authentication/controller/passport-config");

const UserModel = require("../../authentication/model/user-model");

exports.listAllUsers = ()=> async (req, res, next) => {
  const userMap = {};
  const countAllUsers = await UserModel.countDocuments().exec();
    await UserModel.find().then((users) => {
 
        users.forEach(function (user) {
        let info = {};
        
        info.firstname = user.firstname;
        info.lastname = user.lastname;
        info.email = user.email;
        info.phone = user.phone;
        info.role = user.role;
        userMap[user._id] = info;
      });
    });
    req.users = userMap;
    req.numberOfUsers = countAllUsers;
    next();

};
