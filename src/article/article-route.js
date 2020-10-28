const { Router } = require("express");

const { findAll, updateArticle, create, deleteAll } = require("./article-controller");

const articleRouter = Router();
articleRouter.get('/list', findAll);
articleRouter.put('/update',updateArticle);
articleRouter.post('/create',create);
articleRouter.delete('/delete',deleteAll);
exports.articleRouter = articleRouter;