const { Router } = require("express");
const { list, update, remove, create} = require("./commission-controller");
const commissionRouter = Router();

commissionRouter.post('/create', create);
commissionRouter.get('/list', list);
commissionRouter.put('/update',update);
commissionRouter.delete('/delete', remove);

exports.commissionRouter=commissionRouter;

