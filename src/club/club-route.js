const { Router } = require("express");
const { findAll, createAll, UpdateClub, deleteAll } = require("./club-controller");
const clubRouter = Router();

clubRouter.get('/list', findAll);
clubRouter.post("/", createAll);
clubRouter.put('/update',UpdateClub);
clubRouter.delete("/:id", deleteAll);

exports.clubRouter=clubRouter;

