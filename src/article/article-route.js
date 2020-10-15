const { Router } = require("express");
const { findAll, UpdateArticle } = require("./article-controller");

const articleRouter = Router();
articleRouter.get('/list', findAll);
articleRouter.put('/update',UpdateArticle);
exports.articleRouter = articleRouter;