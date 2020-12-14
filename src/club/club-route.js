const { Router } = require("express");
const { paginate } = require('../middleware/controller/pagination-controller');
const { ClubModel } = require("./club-model");
const { create, update, remove, findOne } = require("./club-controller");
const clubRouter = Router();

clubRouter.post("/create", create);
clubRouter.get('/list',paginate(ClubModel),(req, res) => {
  res.status(200).json({
    error: null,
    data:req.list
  });
});
clubRouter.put('/update',update);
clubRouter.delete("/delete", remove);
clubRouter.get('/get', findOne);


exports.clubRouter=clubRouter;   