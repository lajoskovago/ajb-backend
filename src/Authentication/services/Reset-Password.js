const UserModel=require('../model/UserModel');
const dotenv=require('dotenv');
dotenv.config({path:'./src/config/.env'});
const bcrypt = require('bcrypt');
const passport=require('passport');
require('../controller/passport-config');
exports.ResetPassword=(req,res,next)=>{

    const newPassword=req.body.password;
    const hashConst=10;

    passport.authenticate('jwtRecover',{session:false},
     async(error)=>{
         if(error)//resolves the time limit problem
        return res.status(400).json('Your reset password link is invalid,please try again')

     //resolves the only once valid link problem
     const User = await UserModel.findOne({ resetPasswordToken: req.params.token})
     if (!User) {
         return res.status(400).json('Password reset token is invalid or has expired.');
     }

     const passwordHash=await bcrypt.hash(newPassword,hashConst);

     User.password=passwordHash;
     User.resetPasswordToken=undefined;
     User.save();
     next()
    }
)(req,res)

}
//if needed we can add a reset password confirmation email sender here