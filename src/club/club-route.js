const { Router } = require("express");
const { paginate } = require('../middleware/controller/pagination-controller');
const { createAll, updateClub, deleteAll } = require("./club-controller");
const { ClubModel } = require("./club-model");
const clubRouter = Router();

clubRouter.post("/create", createAll);
clubRouter.get('/list',paginate(ClubModel),(req, res) => {
    res.status(200).json({
      error: null,
      data:req.list
    });
  });
clubRouter.put('/update',updateClub);
clubRouter.delete("/delete", deleteAll);

exports.clubRouter=clubRouter;