require('dotenv').config( {path:'./src/config/.env'} )
const bcrypt = require('bcrypt');
const UserModel = require('../model/user-model');

exports.Register = async (req,res,next) => {
    const { email,password }=req.body;
    const hashConst=10;

    const foundUser = await UserModel.findOne( { email } )
    if (foundUser) {
        return res.status(400).send('Email is already in use');
    } else {
        const passwordHash = await bcrypt.hash(password,hashConst);
        const newUser = new UserModel({email,password:passwordHash});

        await newUser.save();

        req.userEmail=newUser.email;
        req.userRole=newUser.role;

        next();
    }
};

