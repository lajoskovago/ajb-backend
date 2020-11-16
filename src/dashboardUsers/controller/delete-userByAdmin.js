require("../../authentication/controller/passport-config");

const mongoose = require("mongoose");
const UserModel = require("../../authentication/model/user-model");

exports.removeUser = () => async (req, res, next) => {
  {
 
        const validationId = mongoose.Types.ObjectId.isValid(req.body._id);
        if (!validationId) {
          return res.status(400).json({
            error: "Sorry, but provided id is inccorect!",
            data: []
          });
        } else {
          const { _id } = req.body;
          const foundUser = await UserModel.findOne({ _id });

          if (!foundUser) {
            return res
              .status(400)
              .json({
                error: "Sorry, user with provided id doesn't exist in the database!",
                data: []
              }
                
              );
          } else {
      // Here we have a condition which don't allow an admin to delete his own account 

            if(req.userEmail==foundUser.email){
              return res
              .status(400)
              .json({
                error: "Sorry, your account cannot be deleted!",
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
  };

