const UserModel = require('../model/user-model');
const dotenv = require('dotenv');
dotenv.config( {path:'./src/config/.env'} );
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../controller/passport-config');
exports.ResetPassword = (req,res,next)=> {

    const newPassword = req.body.password;
    const hashConst = 10;

    passport.authenticate('jwtRecover',{session:false},
     async(error,payload) => {
         if(error)//resolves the time limit problem
            return res.status(400).json({message:"Your reset password link is invalid,please try again"})
         if(!payload) {
            return res.status(400).json({message:'The payload is undefined'})
         }

     //resolves the only once valid link problem
     const user = await UserModel.findOne( { resetPasswordToken: req.params.token} )
     if (!user) {
         return res.status(400).json('Password reset token is invalid or has expired.');
     }

     const passwordHash = await bcrypt.hash(newPassword,hashConst);

     user.password = passwordHash;
     user.resetPasswordToken = undefined;
     user.save();
     next()
    }
)(req,res)

}
//if needed we can add a reset password confirmation email sender here