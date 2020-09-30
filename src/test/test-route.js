const { Router } = require("express");
const { add } = require("./test-controller");

const testRouter = Router();
testRouter.get('/add', add);
exports.testRouter = testRouter;