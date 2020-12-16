const { Router } = require("express");
const { list, create, update, remove, findOne } = require("./club-controller");
const clubRouter = Router();
const { csrfAuthentication } = require('../authentication/controller/csfr-authentication-controller');

clubRouter.post("/create", csrfAuthentication, create);
clubRouter.get('/list', csrfAuthentication, list);
clubRouter.put('/update', csrfAuthentication, update);
clubRouter.delete("/delete", csrfAuthentication, remove);
clubRouter.get('/get', findOne);


exports.clubRouter=clubRouter;   