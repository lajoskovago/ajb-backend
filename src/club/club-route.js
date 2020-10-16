const { Router } = require("express");
const { findAll, createAll, UpdateClub, deleteAll } = require("./club-controller");
const clubRouter = Router();

clubRouter.post("/create", createAll);
clubRouter.get('/list', findAll);
clubRouter.put('/update',UpdateClub);
clubRouter.delete("/:id", deleteAll);

exports.clubRouter=clubRouter;

