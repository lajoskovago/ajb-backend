const mongoose = require("mongoose");
const UserModel = require("../../authentication/model/user-model");

exports.removeUser = () => async (req, res, next) => {
  const { _id } = req.body;

      if(!_id){
    return res.status(400).json({
      error: "Sorry, but a valid id is needed to complete the operation. Please enter one.",
      data: []
    });
  }
        const validationId = mongoose.Types.ObjectId.isValid(_id);
        if (!validationId) {
          return res.status(400).json({
            error: "Sorry, but provided id is incorrect(must be ObjectId)!",
            data: []
          });
        } else {
          
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
      // Here we have a condition which doesn't allow an admin to delete his own account 

            if(req.userEmail==foundUser.email){
              return res
              .status(400)
              .json({
                error: "Sorry, your account cannot be deleted!",
                data: []
              })
            } else {
            await UserModel.findByIdAndRemove({ _id });
            req.id = _id;
            next();
          }
        }
        }
  };

