const express = require("express");
const router = express.Router();

const { createUser } = require("../controller/create-userByAdmin");
const { listAllUsers } = require("../controller/view-allUsers");
const { getUser } = require("../controller/get-userByAdmin");
const { updateUser } = require("../controller/edit-userByAdmin");
const { removeUser } = require("../controller/delete-userByAdmin");
const { authorizeUser } = require("../../authentication/controller/authorization-controller");

// Create user by only Admin
router
  .route("/create-user")
  .post(authorizeUser(process.env.ADMIN_ROLE),createUser(), (req, res) => {
    res.status(200).json({
      error: null,
      data: [{
       message: "Your data has been successfully registered!(You are the admin)",
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
  .put(authorizeUser(process.env.ADMIN_ROLE),updateUser(), (req, res) => {
    res.status(200).json({
      error : null,
      data : [{
        message: "Your data has been successfully registered!(You are the admin)"
      }]
      
    });
  });

//Delete user
router
  .route("/delete-user")
  .delete(authorizeUser(process.env.ADMIN_ROLE),removeUser(), (req, res) => {
    res.status(200).send({
      error : null,
      data : [{
        message: "The user was deleted successfully.!(You are the admin)",
        providedId :req.id
      }]
      
    });
  });

module.exports = router;
