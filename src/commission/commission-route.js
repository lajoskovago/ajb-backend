const { Router } = require("express");
const { paginate } = require('../middleware/controller/pagination-controller');
const { updateCommission, remove, createAll} = require("./commission-controller");
const { CommissionModel } = require("./commission-model");
const commissionRouter = Router();

commissionRouter.post('/create', createAll);
commissionRouter.get('/list', paginate(CommissionModel),(req, res) => {
  res.status(200).json({
    error: null,
    data:req.list
  });
});
commissionRouter.put('/update',updateCommission);
commissionRouter.delete('/delete', remove);

exports.commissionRouter=commissionRouter;

