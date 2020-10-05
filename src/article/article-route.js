const { Router } = require("express");
const { findAll, UpdateArticle } = require("./article-controller");

const articleRouter = Router();
articleRouter.get('/list', findAll);
exports.articleRouter = articleRouter;
articleRouter.put('/update',UpdateArticle);
exports.articleRouter = articleRouter;