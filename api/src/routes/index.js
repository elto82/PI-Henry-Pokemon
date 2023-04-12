const { Router } = require("express");

// Importar todos los routers;
const pokeRouter = require("./pokeRouter");
const typeRouter = require("./typeRouter");

const router = Router();

// Configurar los routers
router.use("/pokemons", pokeRouter);
router.use("/types", typeRouter);

module.exports = router;
