const { Router } = require("express");
const { findAll, createAll, updateClub, deleteAll } = require("./club-controller");
const { getModelById } = require("../middleware/controller/getById");
const { ClubModel } = require("./club-model");
const clubRouter = Router();

clubRouter.post("/create", createAll);
clubRouter.get('/list', findAll);
clubRouter.get('/get', getModelById(ClubModel), (req, res) => {
  res.status(200).json({
    error: null,
    data:[{
        result:req.result
    }]
  });
});;
clubRouter.put('/update',updateClub);
clubRouter.delete("/delete", deleteAll);

exports.clubRouter=clubRouter;