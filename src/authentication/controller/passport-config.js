const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../model/user-model');

//local strategy for simple credential based log-in
passport.use(new LocalStrategy( {
    usernameField: "email",
    passwordField: "password",
},async(email,password,done) => {

    try {
        const userDocument = await UserModel.findOne( {email} ).exec();
        const passwordMatch = await bcrypt.compare(password,userDocument.password);
        if(passwordMatch) {
            return done(null,userDocument);
        }else {
            return done('Incorrect Password');
        }
    } catch (error) {
        done('Incorrect email');
    }
}));
//jwt strategy for role based jwt token authorization
passport.use('jwt',new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
},
(jwtPayload,done) => {
    if(Date.now()>jwtPayload.expires) {
        return done('jwt session expired');
    }
    return done(null,jwtPayload);
}
));

//jwt strategy for refresh token functionality
passport.use('jwtRefresh',new JWTStrategy({
    jwtFromRequest: req => req.cookies.refresh,
    secretOrKey: process.env.REFRESH_TOKEN_SECRET
},
(jwtPayload,done) => {
    return done(null,jwtPayload);
}
));

//jwt strategy for recover password functionality
passport.use('jwtRecover',new JWTStrategy({
    jwtFromRequest: req => req.body.token,
    secretOrKey: process.env.RECOVER_TOKEN_SECRET
},
(jwtPayload,done) => {
    if(Date.now()>jwtPayload.expires) {
        return done('jwt expired');
    }
    return done(null,jwtPayload);
}
));