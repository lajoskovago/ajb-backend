const { Router } = require("express");
const { deleteAll } = require("../Article/controller");
const { createAll, deleteAll } = require("./club-controller");
const clubRouter = Router();

router.post("/", create);
router.delete("/:id", deleteAll);

exports.clubRouter=clubRouter;

