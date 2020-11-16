require("../../authentication/controller/passport-config");

var mongoose = require("mongoose");
const UserModel = require("../../authentication/model/user-model");

exports.removeAnUser = () => async (req, res, next) => {
  {
 
        const id = mongoose.Types.ObjectId.isValid(req.body._id);
        if (!id) {
          return res.status(400).json({
            error: "Sorry, but your id is inccorect!",
            data: []
          });
        } else {
          const { _id } = req.body;
          const foundUser = await UserModel.findOne({ _id });

          if (!foundUser) {
            return res
              .status(400)
              .json({
                error: "Sorry, this user " +req.body._id +" no longer exists in the database",
                data: []
              }
                
              );
          } else {
            if(req.userEmail==foundUser.email){
              return res
              .status(400)
              .json({
                error: "Sorry, your account cannot be deleted",
                data: []
              })
            } else {
            await UserModel.findByIdAndRemove({ _id });
            req.id = req.body._id;
            next();
          }
        }
        }
      }
    (req, res);
  };

