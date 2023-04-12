const { Router } = require("express");
const { getTypes } = require("../controllers/typeController");
const typeRouter = Router();

typeRouter.get("/", getTypes);

module.exports = typeRouter;
