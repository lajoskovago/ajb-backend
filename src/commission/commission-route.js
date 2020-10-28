const { Router } = require("express");
const { findAll, updateCommission } = require("./commission-controller");
const commissionRouter = Router();

//commissionRouter.post("/create", createAll);
commissionRouter.get('/list', findAll);
commissionRouter.put('/update',updateCommission);
//commissionRouter.delete("/delete", deleteAll);

exports.commissionRouter=commissionRouter;

