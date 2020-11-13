const { Router } = require("express");

const { findAll, updateArticle, create, deleteAll,uploadFiles } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('/list', findAll);
articleRouter.put('/update',updateArticle);
articleRouter.post('/create',create);
articleRouter.delete('/delete',deleteAll);
articleRouter.post('/upload-files', uploadFiles);
exports.articleRouter = articleRouter;
