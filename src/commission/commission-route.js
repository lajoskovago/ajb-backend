const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const { paginate } = require('../middleware/controller/pagination-controller');
const { findAll, updateCommission, remove, createAll} = require("./commission-controller");
const { CommissionModel } = require("./commission-model");
const commissionRouter = Router();

commissionRouter.post('/create', createAll);
commissionRouter.get('/list', findAll);
commissionRouter.get('',authorizeUser(process.env.Admin_ROLE,process.env.DEFAULT_ROLE),paginate(CommissionModel),(req, res) => {
    res.status(200).json({
      error: null,
      data:req.list
    });
  });
commissionRouter.put('/update',updateCommission);
commissionRouter.delete('/delete', remove);

exports.commissionRouter=commissionRouter;

