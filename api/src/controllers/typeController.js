const axios = require("axios");
const { Type } = require("../db");

async function getTypes(req, res) {
  try {
    let types = await Type.findAll();

    if (types.length === 0) {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      types = response.data.results;

      for (let i = 0; i < types.length; i++) {
        await Type.create({ name: types[i].name });
      }

      types = await Type.findAll();
    }

    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getTypes,
};
