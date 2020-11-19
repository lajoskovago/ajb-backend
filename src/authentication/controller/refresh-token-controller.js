const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./passport-config');

exports.refreshedToken = (req, res, next) => {
    passport.authenticate('jwtRefresh',{ session: false },
       (error,payload) => {
           if(error) {
            return res.status(400).json({
                error: error,
                data: null
              })
           }
           if(!payload) {
            return res.status(400).json({
                error: "The payload is undefined/You don t have a refresh token",
                data: null
             })
           }

           const newPayload = {
            email: payload.email,
            role: payload.role,
            expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
        };
           const token = jwt.sign(JSON.stringify(newPayload),process.env.ACCESS_TOKEN_SECRET);

           res.cookie('jwt',token,{httpOnly: true,secure:true});
           next();
        }
    )(req,res)
}