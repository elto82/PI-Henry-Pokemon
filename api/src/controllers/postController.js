const { Pokemon, Type } = require("../db");

const createPokemon = async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    cretedInBd,
    types,
  } = req.body;

  if (!name || !hp || !attack || !defense) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      cretedInBd,
    });

    let type = await Type.findAll({
      where: {
        name: types,
      },
    });

    newPokemon.addType(type);

    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(500).json({ message: error.mesagge });
  }
};

module.exports = {
  createPokemon,
};
