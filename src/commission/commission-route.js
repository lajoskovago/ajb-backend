const { Router } = require("express");
const { createConnection } = require("mongoose");
const { list, update, remove, create, findOne} = require("./commission-controller");
const commissionRouter = Router();
const { csrfAuthentication } = require('../authentication/controller/csfr-authentication-controller');

commissionRouter.post('/create', csrfAuthentication , create);
commissionRouter.get('/list', csrfAuthentication , list);
commissionRouter.put('/update', csrfAuthentication ,update);
commissionRouter.delete('/delete', csrfAuthentication , remove);
commissionRouter.get('/get', findOne);


exports.commissionRouter=commissionRouter;

