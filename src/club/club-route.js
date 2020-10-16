const { Router } = require("express");
const { createAll, deleteAll } = require("./club-controller");
const clubRouter = Router();

clubRouter.get('/list', findAll);
clubRouter.post("/", createAll);
clubRouter.delete("/:id", deleteAll);

exports.clubRouter=clubRouter;

