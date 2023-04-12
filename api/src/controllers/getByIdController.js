const { getAllData } = require("./getAllCharactersController");

async function getPokemonById(req, res) {
  const { id } = req.params;
  try {
    let allPokemon = await getAllData();
    if (id) {
      let pokemonId = allPokemon.filter((poke) => poke.id == id);
      pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(404).json({ mesagge: "Pokemon not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.mesagge });
  }
}

module.exports = { getPokemonById };
