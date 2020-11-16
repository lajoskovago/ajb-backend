require('../../authentication/controller/passport-config');

const UserModel = require('../../authentication/model/user-model');



exports.getUser =() => async(req,res,next) => {
         const user = {};
         if(!req.body.email){
            return res.status(400).json({
            error: 'Sorry, but email is required!',
            data: []
            });
         }
         const {email} = req.body;
         const foundUser = await UserModel.findOne({ email });
         
         if (!foundUser) {
             return res.status(400).json({
                error: 'Sorry, but user not be found!',
                data: []
             });
         } else {

        user.name=foundUser.name,
        user.firstname=foundUser.firstname, 
        user.email=foundUser.email,
        user.phone=foundUser.phone,
        user.role=foundUser.role,

        req.user = user;

        next();
         }  
       
   (req,res)
}



