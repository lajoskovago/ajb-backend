const express = require("express");
const router = express.Router();

const { createAnUser } = require("../controller/create-userByAdmin");
const { listAllUsers } = require("../controller/view-allUsers");
const { getUser } = require("../controller/get-userByAdmin");
const { updateAnUser } = require("../controller/edit-userByAdmin");
const { removeAnUser } = require("../controller/delete-userByAdmin");
const { authorizeUser } = require("../../authentication/controller/authorization-controller");

// Create user by only Admin
router
  .route("/create-user")
  .post(authorizeUser(process.env.ADMIN_ROLE),createAnUser(), (req, res) => {
    res.status(200).json({
      error: null,
      data: [{
       message: "Your data has been successfully registered!(Your are the admin)",
       newaccount: req.email,
      }]
      
    });
  });

// View All Users by only Admin
router
  .route("/view-users")
  .get(authorizeUser(process.env.ADMIN_ROLE),listAllUsers(), (req, res) => {
    res.status(200).json({
      error: null,
      data:[{
        message: "This is the list of all users",
        NumberofUsers : req.numberOfUsers,
        ListOfUsers: req.users,

      }]
      
    });
  });

//Get user by email
router
  .route("/get-user")
  .get(authorizeUser(process.env.ADMIN_ROLE),getUser(), (req, res) => {
    res.status(200).json({
      error: null,
      data: [{
        user: req.user
      }]  

    });
  });

//Edit user profile
router
  .route("/edit-user")
  .put(authorizeUser(process.env.ADMIN_ROLE),updateAnUser(), (req, res) => {
    res.status(200).json({
      error : null,
      data : [{
        message: "Your data has been successfully registered!(Your are the admin)"
      }]
      
    });
  });

//Delete user
router
  .route("/delete-user")
  .delete(authorizeUser(process.env.ADMIN_ROLE),removeAnUser(), (req, res) => {
    res.status(200).send({
      error : null,
      data : [{
        message: "The user with next id " +req.id +" was deleted successfully.!(Your are the admin)"
      }]
      
    });
  });

module.exports = router;
