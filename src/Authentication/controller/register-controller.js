require('dotenv').config()
const bcrypt = require('bcrypt');
const UserModel=require('../model/UserModel');

exports.Register = async (req,res,next) => {
    const {username,email,password}=req.body;
    const hashConst=10;

    const foundUser = await UserModel.findOne({ email })
    if (foundUser) {
        return res.status(400).send('Email is already in use');
    }else{
        const passwordHash=await bcrypt.hash(password,hashConst);
        const newUser=new UserModel({username,email,password:passwordHash});

        await newUser.save();
        next();
    }
};

