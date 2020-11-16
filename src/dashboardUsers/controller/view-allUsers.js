require("../../authentication/controller/passport-config");

const UserModel = require("../../authentication/model/user-model");

exports.listAllUsers = ()=> async (req, res, next) => {
  var userMap = {};
  var countAllUsers = 0;
    await UserModel.find().then((users) => {
 
        users.forEach(function (user) {
        var info = {};
        
        info.name = user.name;
        info.firstname = user.firstname;
        info.email = user.email;
        info.phone = user.phone;
        info.role = user.role;
        userMap[user._id] = info;
        countAllUsers++;
      });
    });
    req.users = userMap;
    req.numberOfUsers = countAllUsers;
    next();
 (req, res);
};
