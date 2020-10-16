const { Router } = require("express");

const clubRouter = Router();
clubRouter.get('/list', findAll);
exports.clubRouter = clubRouter;