const ROLES = {
    Admin: 'admin',
    Customer: 'customer'
}

const express=require('express');
const router=express.Router();

const {authorizeUser}=require('../controller/authorization-controller');
const {refreshedToken}=require('../controller/refresh-token-controller');
const {SendRecoverEmail}=require('../services/Send-Recover-Email');
const {ResetPassword}=require('../services/Reset-Password');
const {LogIn}  = require('../controller/login-controller');
const {Register} =require('../controller/register-controller');

//sign-up
router.route('/Register').post(Register,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:'hi u just singed-in'
    })
});

//sign-in
router.route('/Login').post(LogIn,(req,res)=>{
    res.status(200).json(`hi you just logged in`)
});

//all roles page
router.route('/HomePage').get(authorizeUser(ROLES.Admin,ROLES.Customer),(req,res) => {
    res.status(200).json("hi you are on the home page where everyone has access")
});

//admin only page
router.route('/AdminPage').get(authorizeUser(ROLES.Admin),(req,res) => {
res.status(200).json("hi you are on the admin page where only u have access u rock star")
});

//customer only page
router.route('/CustomerOnlyPage').get(authorizeUser(ROLES.Customer),(req,res) => {
res.status(200).json(`Hi this is a customer only page`)
});

//refresh token
router.route('/RefreshToken').post(refreshedToken,(req,res) => {
res.status(200).json("hi this is the refresh page the new token should be in the headers section")
});

//logout
router.route('/Logout').delete((req,res) => {
req.logout();
res.cookie('refresh','deleted',{httpOnly:true,secure:true});
res.cookie('jwt','deleted',{httpOnly:true,secure:true});
res.status(200).json('u are logged out and the tokens were deleted from the cookies');
});

//send reset email
router.route('/Forgot').post(SendRecoverEmail,(req,res)=>{
res.status(200).json(`We have sent an confirmation email to ${req.body.email}`)
});

//reset password
router.route('/Reset/:token').post(ResetPassword,(req,res)=>{
res.status(200).send('Your password has been reset')
});

module.exports = router;