require('dotenv').config({ path:'./src/config/.env' })
const passport = require('passport');
require('./passport-config');

exports.authorizeUser = (...roles) => (req, res, next) => {
    passport.authenticate('jwt',{ session:false },
       (error,payload) => {
           if(error) {
              return res.status(400).json(error)
           }
           if(!payload) {
             return res.status(400).json( {message:"the payload is undefined"} )
           }
          const hasRole = roles.find(role => payload.role === role)
          if (!hasRole) {
            return res.status(403).json( {
              message:'you don`t have the authorization for this request',
              rolesNeeded:roles,
              yourRole:payload.role,
          })
          }
            req.userEmail=payload.email;
            req.userRole=payload.role;
           next();
        }
    )(req,res)
}