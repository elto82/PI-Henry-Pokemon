const { Router } = require("express");

const pokeRouter = Router();

const { getAllPokemon } = require("../controllers/getController");
const { createPokemon } = require("../controllers/postController");
const { getPokemonById } = require("../controllers/getByIdController");

pokeRouter.get("/", getAllPokemon);

pokeRouter.post("/post", createPokemon);

pokeRouter.get("/:id", getPokemonById);

module.exports = pokeRouter;
