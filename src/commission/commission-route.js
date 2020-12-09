const { Router } = require("express");
const { findAll, updateCommission, remove, createAll} = require("./commission-controller");
const { getModelById } = require("../middleware/controller/getById");
const { CommissionModel } = require("./commission-model");
const commissionRouter = Router();

commissionRouter.post('/create', createAll);
commissionRouter.get('/list', findAll);
commissionRouter.get('/get', getModelById(CommissionModel), (req, res) => {
    res.status(200).json({
      error: null,
      data:[{
          result:req.result
      }]
      
    });
  });
commissionRouter.put('/update',updateCommission);
commissionRouter.delete('/delete', remove);

exports.commissionRouter=commissionRouter;

