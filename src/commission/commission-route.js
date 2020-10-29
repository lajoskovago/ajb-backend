const { Router } = require("express");
const { findAll, updateCommission, create, remove} = require("./commission-controller");
const commissionRouter = Router();

commissionRouter.post('/create', create);
commissionRouter.get('/list', findAll);
commissionRouter.put('/update',updateCommission);
commissionRouter.delete('/delete', remove);

exports.commissionRouter=commissionRouter;

