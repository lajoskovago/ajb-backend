require('dotenv').config()
const passport = require('passport');
require('./passport-config');

exports.authorizeUser=(...roles) => (req, res, next) => {
    passport.authenticate('jwt',{session:false},
       (error,payload) => {
           if(error||!payload){
              return res.status(400).json(error)
           }
          const hasRole = roles.find(role => payload.role === role)
          if (!hasRole) {
            return res.status(403).json('you don`t have the authorization for this request')
          }
           next();
        }
    )(req,res)
}