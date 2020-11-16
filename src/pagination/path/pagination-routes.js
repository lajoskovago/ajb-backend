const express = require("express");
const router = express.Router();

// necessary resources
const UserModel = require("../../authentication/model/user-model");
const {ArticleModel} = require("../../article/article-model");
const { ClubModel } = require("../../club/club-model");
const { CommissionModel } = require("../../commission/commission-model");
//


const { paginate } = require("../controller/pagination-controller");
const {authorizeUser} = require("../../authentication/controller/authorization-controller");

router
  .route("/users")
  .get(authorizeUser(process.env.ADMIN_ROLE),paginate(UserModel), (req, res) => {
    res.status(200).json({
      error: null,
      data:req.paginatedResults



    });
  });

  router
  .route("/articles")
  .get(authorizeUser(process.env.ADMIN_ROLE,process.env.DEFAULT_ROLE),paginate(ArticleModel), (req, res) => {
    res.status(200).json({
      error: null,
      data:req.paginatedResults



    });
  });
  router
  .route("/club")
  .get(authorizeUser(process.env.ADMIN_ROLE,process.env.DEFAULT_ROLE),paginate(ClubModel), (req, res) => {
    res.status(200).json({
      error: null,
      data:req.paginatedResults



    });
  });

  router
  .route("/commission")
  .get(authorizeUser(process.env.ADMIN_ROLE,process.env.DEFAULT_ROLE),paginate(CommissionModel), (req, res) => {
    res.status(200).json({
      error: null,
      data:req.paginatedResults



    });
  });
module.exports = router; 