const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const { paginate } = require('../middleware/controller/pagination-controller');
const { findAll, createAll, updateClub, deleteAll } = require("./club-controller");
const { ClubModel } = require("./club-model");
const clubRouter = Router();

clubRouter.post("/create", createAll);
clubRouter.get('/list', findAll);
clubRouter.get('',authorizeUser(process.env.Admin_ROLE,process.env.DEFAULT_ROLE),paginate(ClubModel),(req, res) => {
    res.status(200).json({
      error: null,
      data:req.list
    });
  });
clubRouter.put('/update',updateClub);
clubRouter.delete("/delete", deleteAll);

exports.clubRouter=clubRouter;