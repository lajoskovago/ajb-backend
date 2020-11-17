const { Router } = require("express");

const { findAll, updateArticle, create, deleteAll,uploadFile } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('/list', findAll);
articleRouter.put('/update',updateArticle);
articleRouter.post('/create',create);
articleRouter.delete('/delete',deleteAll);
articleRouter.post('/upload-file', uploadFile);
exports.articleRouter = articleRouter;
