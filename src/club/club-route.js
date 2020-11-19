const { Router } = require("express");
const { list, create, update, remove, findOne } = require("./club-controller");
const clubRouter = Router();

clubRouter.post("/create", create);
clubRouter.get('/list', list);
clubRouter.put('/update',update);
clubRouter.delete("/delete", remove);


exports.clubRouter=clubRouter;   