const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const ROLES = { Admin:'admin', Customer:'customer' }

const { findAll, updateArticle, create, deleteAll } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('/list', findAll);
articleRouter.put('/update', authorizeUser(ROLES.Admin), updateArticle);
articleRouter.post('/create', authorizeUser(ROLES.Admin), create);
articleRouter.delete('/delete', authorizeUser(ROLES.Admin), deleteAll);
exports.articleRouter = articleRouter;
