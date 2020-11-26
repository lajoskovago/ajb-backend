const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const ROLES = { Admin:'admin', Customer:'customer' }

const { list, update, create, remove,uploadFile, findOne } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('/list', list);
articleRouter.put('/update', authorizeUser(ROLES.Admin), update);
articleRouter.post('/create', authorizeUser(ROLES.Admin), create);
articleRouter.delete('/delete', authorizeUser(ROLES.Admin), remove);
articleRouter.post('/upload-file', authorizeUser(ROLES.Admin), uploadFile);
articleRouter.get('/get', findOne);


exports.articleRouter = articleRouter;
