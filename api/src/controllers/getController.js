const { getAllData } = require("./getAllCharactersController");

const getAllPokemon = async (req, res) => {
  try {
    const name = req.query.name;
    const allPokemon = await getAllData();

    if (name) {
      const filteredPokemon = allPokemon.filter(
        (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
      );

      filteredPokemon.length
        ? res.status(200).json(filteredPokemon)
        : res.status(404).json({ message: "Pokemon not found" });
    } else {
      res.status(200).json(allPokemon);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPokemon,
};
