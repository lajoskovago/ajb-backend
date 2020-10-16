const { Router } = require("express");

const { findAll, UpdateArticle, create, remove } = require("./article-controller");

const articleRouter = Router();
articleRouter.get('/list', findAll);
articleRouter.put('/update',UpdateArticle);
articleRouter.post('/create',create);
articleRouter.delete('/remove',remove);
exports.articleRouter = articleRouter;