const { Router } = require("express");
const { createConnection } = require("mongoose");
const { list, update, remove, create, findOne} = require("./commission-controller");
const commissionRouter = Router();

commissionRouter.post('/create', create);
commissionRouter.get('/list', list);
commissionRouter.put('/update',update);
commissionRouter.delete('/delete', remove);
commissionRouter.get('/get', findOne);


exports.commissionRouter=commissionRouter;

