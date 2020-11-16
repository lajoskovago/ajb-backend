const express = require('express');
const router = express.Router();

const {authorizeUser} = require("../../authentication/controller/authorization-controller");
const { getProfile } = require('../controller/view-profile');
const { updateProfile } = require('../controller/edit-profile');

// Curent user profile
router.route('/profile').get(authorizeUser(process.env.ADMIN_ROLE,process.env.DEFAULT_ROLE),getProfile,(req, res) => {

    res.status(200).json({
        error: null,
        data : [{
            message:'Welcome',
            firstname:req.firstname,
            lastname:req.lastname,
            email:req.email,
            phone:req.phone,
            role:req.role,
            createdAt:req.createdAt
        }]
        
    });
 });

 //Edit user profile
 router.route('/edit-profile').put(authorizeUser(process.env.ADMIN_ROLE,process.env.DEFAULT_ROLE),updateProfile,(req, res) => {

    res.status(200).json({
        error: null,
        data : [{
            message:'Your data has been successfully registered!'
        }]
        

        
    });
 });

 module.exports = router;