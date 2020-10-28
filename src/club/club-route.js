const { Router } = require("express");
const { findAll, createAll, updateClub, deleteAll } = require("./club-controller");
const clubRouter = Router();

clubRouter.post("/create", createAll);
clubRouter.get('/list', findAll);
clubRouter.put('/update',updateClub);
clubRouter.delete("/delete", deleteAll);

exports.clubRouter=clubRouter;