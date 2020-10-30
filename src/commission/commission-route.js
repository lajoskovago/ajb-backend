const { Router } = require("express");
const { findAll, updateCommission, remove, createAll} = require("./commission-controller");
const commissionRouter = Router();

commissionRouter.post('/create', createAll);
commissionRouter.get('/list', findAll);
commissionRouter.put('/update',updateCommission);
commissionRouter.delete('/delete', remove);

exports.commissionRouter=commissionRouter;

