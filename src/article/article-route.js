const { Router } = require("express");
const { authorizeUser } = require('../authentication/controller/authorization-controller');
const ROLES = { Admin:'admin', Customer:'customer' }
const { getModelById } = require("../middleware/controller/getById");
const { findAll, updateArticle, create, deleteAll } = require("./article-controller");
const { ArticleModel } = require("./article-model");

const articleRouter =   Router(); 
articleRouter.get('/list', findAll);
articleRouter.get('/get', getModelById(ArticleModel), (req, res) => {
    res.status(200).json({
      error: null,
      data:[{
          result:req.result
      }]
    });
  });
articleRouter.put('/update', authorizeUser(ROLES.Admin), updateArticle);
articleRouter.post('/create', authorizeUser(ROLES.Admin), create);
articleRouter.delete('/delete', authorizeUser(ROLES.Admin), deleteAll);
exports.articleRouter = articleRouter;
