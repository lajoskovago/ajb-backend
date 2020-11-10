require('dotenv').config( {path:'./src/config/.env'} )
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./passport-config');

exports.refreshedToken = (req, res, next) => {
    passport.authenticate('jwtRefresh',{ session:false },
       (error,payload) => {
           if(error) {
              return res.status(400).json(error)
           }
           if(!payload) {
               return res.status(400).json({message:"The payload is undefined/You don t have a refresh token"})
           }

           const newPayload = {
            email:payload.email,
            role:payload.role,
            expires:Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
        };
           const token = jwt.sign(JSON.stringify(newPayload),process.env.ACCESS_TOKEN_SECRET);

           res.cookie('jwt',token,{httpOnly:true});
           next();
        }
    )(req,res)
}