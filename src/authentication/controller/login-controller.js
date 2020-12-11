const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./passport-config');

exports.LogIn = (req,res,next) => {
   passport.authenticate('local',{ session: false },
       (error,user) => {

        if(error) {
         return res.status(400).json({
            error: error,
            data: null
         })
         }
         if(!user) {
            return res.status(400).json({
               error: "the user is undefined/there is no user whit this email",
               data: null
             })
         }

           const payload = {
               email: user.email,
               role: user.role,
               expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
            };

           const refreshPayload = {
            email: user.email,
            role: user.role,
            expires: Date.now() + parseInt(process.env.JWT_REFRESH_MS)
           }

           req.login(payload,{ session: false }, (error) => {
             if(error) {
               return res.status(500).json(
                  {
                      error: error,
                      data: null
                  });
             }

             const token = jwt.sign(JSON.stringify(payload),process.env.ACCESS_TOKEN_SECRET);
             const refreshToken = jwt.sign(JSON.stringify(refreshPayload),process.env.REFRESH_TOKEN_SECRET);

              req.userEmail = user.email;
              req.userRole = user.role;

              res.cookie('jwt',token,{httpOnly: true,secure: true});
              res.cookie('refresh',refreshToken,{httpOnly: true,secure: true});


              next();
           });
       }
   )(req,res)
}


