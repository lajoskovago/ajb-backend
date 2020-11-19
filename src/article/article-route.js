const { Router } = require("express");

const { list, update, create, remove } = require("./article-controller");

const articleRouter =   Router(); 
articleRouter.get('/list', list);
articleRouter.put('/update',update);
articleRouter.post('/create',create);
articleRouter.delete('/delete',remove);
exports.articleRouter = articleRouter;
