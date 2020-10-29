require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./passport-config');

exports.LogIn=(req,res,next) => {
   passport.authenticate('local',{session:false},
       (error,user) => {

           if(error||!user){
               return res.status(400).json(error);//10.28.2020
           }

           const payload ={
               username:user.email,
               role:user.role,
               expires:Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
           };

           const refreshPayload={
            username:user.email,
            role:user.role,
           }

           req.login(payload,{session:false}, (error) => {
             if(error){
                return res.status(500).send('There is a server error,we are sorry :(');
             }

             const token=jwt.sign(JSON.stringify(payload),process.env.ACCESS_TOKEN_SECRET);
             const refreshToken=jwt.sign(JSON.stringify(refreshPayload),process.env.REFRESH_TOKEN_SECRET);

              res.cookie('jwt',token,{httpOnly:true,secure:true});
              res.cookie('refresh',refreshToken,{httpOnly:true,secure:true});
              next();
           });
       }
   )(req,res)
}


