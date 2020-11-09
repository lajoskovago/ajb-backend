const ROLES = {
    Admin : 'admin',
    Customer : 'customer'
}

const express = require('express');
const router = express.Router();

const { authorizeUser } = require('../controller/authorization-controller');
const { refreshedToken } = require('../controller/refresh-token-controller');
const { SendRecoverEmail } = require('../services/send-recover-email');
const { ResetPassword } = require('../services/reset-password');
const { LogIn }  = require('../controller/login-controller');
const { Register } = require('../controller/register-controller');
const { logoutUser } = require('../controller/logout-controller');

//sign-up
router.route('/register').post(Register,(req,res) => {
    res.status(200).json({
        error: " ",
        data: [
            {
                message: 'hi u just singed-in',
                email: req.userEmail,
                role: req.userRole
            }
        ]
    })
});

//sign-in
router.route('/login').post(LogIn,(req,res) => {
    res.status(200).json({
        error: " ",
        data: [
            {
                message: 'hey you just logged in',
                email: req.userEmail,
                role: req.userRole
            }
        ]
    })
});

//all roles page
router.route('/home_page').get(authorizeUser(ROLES.Admin,ROLES.Customer),(req,res) => {
    res.status(200).json({
        error: " ",
        data: [
            {
                message: "hi you are on the home page where everyone has access",
                email: req.userEmail,
                role: req.userRole
            }
        ]
})
});

//admin only page
router.route('/admin_page').get(authorizeUser(ROLES.Admin),(req,res) => {
res.status(200).json({
    error: " ",
    data: [
        {
            message: "hi you are on the admin page where only u have access u rock star",
            email: req.userEmail,
            role: req.userRole
        }
    ]
})
});

//customer only page
router.route('/customer_only_page').get(authorizeUser(ROLES.Customer),(req,res) => {
res.status(200).json({
    error: " ",
    data: [
        {
            message: "Hi this is a customer only page",
            email: req.userEmail,
            role: req.userRole
        }
    ]
})
});

//refresh token hi this is the refresh page the new token should be in the headers section
router.route('/refresh_token').post(refreshedToken,(req,res) => {
res.status(200).json({
    error: " ",
    data: [
        {
            message: "hi this is the refresh page the new token should be in the headers section",
            email: req.userEmail,
            role: req.userRole
        }
    ]
})
});

//logout
router.route('/logout').delete(logoutUser,(req,res) => {
   res.status(200).json({
      error: " ",
      data: [
            {
                message: 'u are logged out and the tokens were deleted from the cookies'
            }
        ]
    });
});

//send reset email`The request was accepted.A reset email should be sent to ${req.body.email}.Please check your email`
router.route('/forgot').post(SendRecoverEmail,(req,res) => {
res.status(200).json({
    error: " ",
    data: [
        {
            message:`The request was accepted.A reset email should be sent to ${req.body.email}.Please check your email`
        }
    ]
  });
});

//reset password
router.route('/reset/:token').post(ResetPassword,(req,res) => {
res.status(200).json({
    error: " ",
    data: [
        {
            message: 'Your password has been reset'
        }
    ]
  });
});

module.exports = router;