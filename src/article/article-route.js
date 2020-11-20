const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const { paginate } = require('../middleware/controller/pagination-controller');
const { ArticleModel } = require("./article-model");
const ROLES = { Admin:'admin', Customer:'customer' }

const { findAll, updateArticle, create, deleteAll,uploadFile } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('',authorizeUser(ROLES.Admin,ROLES.Customer),paginate(ArticleModel),(req, res) => {
    res.status(200).json({
      error: null,
      data:req.list
    });
  });
articleRouter.get('/list', findAll);
articleRouter.put('/update', authorizeUser(ROLES.Admin), updateArticle);
articleRouter.post('/create', authorizeUser(ROLES.Admin), create);
articleRouter.delete('/delete', authorizeUser(ROLES.Admin), deleteAll);
articleRouter.post('/upload-file', authorizeUser(ROLES.Admin), uploadFile);

exports.articleRouter = articleRouter;
