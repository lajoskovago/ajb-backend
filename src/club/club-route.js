const { Router } = require("express");
const { createAll, deleteAll } = require("./club-controller");
const clubRouter = Router();

clubRouter.post("/create", createAll);
clubRouter.get('/list', findAll);
clubRouter.delete("/:id", deleteAll);

exports.clubRouter=clubRouter;

