const { Router } = require("express");
const { createConnection } = require("mongoose");
const { paginate } = require('../middleware/controller/pagination-controller');
const { CommissionModel } = require("./commission-model");
const { update, remove, create, findOne} = require("./commission-controller");
const commissionRouter = Router();

commissionRouter.post('/create', create);
commissionRouter.get('/list', paginate(CommissionModel),(req, res) => {
  res.status(200).json({
    error: null,
    data:req.list
  });
});
commissionRouter.put('/update',update);
commissionRouter.delete('/delete', remove);
commissionRouter.get('/get', findOne);


exports.commissionRouter=commissionRouter;

