const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const ROLES = { Admin:'admin', Customer:'customer' }
const { csrfAuthentication } = require('../authentication/controller/csfr-authentication-controller');

const { list, update, create, remove,uploadFile, findOne } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('/list', list);
articleRouter.put('/update',csrfAuthentication, authorizeUser(ROLES.Admin), update);
articleRouter.post('/create',csrfAuthentication,  authorizeUser(ROLES.Admin), create);
articleRouter.delete('/delete',csrfAuthentication,  authorizeUser(ROLES.Admin), remove);
articleRouter.post('/upload-file',csrfAuthentication,  authorizeUser(ROLES.Admin), uploadFile);
articleRouter.get('/get', findOne);



exports.articleRouter = articleRouter;
