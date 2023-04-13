const axios = require("axios");
const { Pokemon } = require("../db");
const { Type } = require("../db");

const getApiData = async () => {
  const pokemons = [];
  let url = "https://pokeapi.co/api/v2/pokemon";
  let count = 0;
  let numberPages = 2;

  try {
    while (url && count < numberPages) {
      const response = await axios.get(url);
      const { results, next } = response.data;
      //console.log(results);
      //console.log(next);
      const pokemonUrls = results.map((result) => result.url);
      const pokemonResponses = await Promise.all(
        pokemonUrls.map((url) => axios.get(url))
      );

      pokemonResponses.forEach((response) => {
        const {
          id,
          name,
          height,
          weight,
          stats,
          types,
          sprites: { other },
        } = response.data;

        const pokemon = {
          id,
          name,
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          height,
          weight,
          image: other["official-artwork"].front_default,
          types: types.map((type) => type.type.name),
        };

        pokemons.push(pokemon);
      });

      url = next;
      count++;
    }
  } catch (error) {
    console.error(error);
  }

  return pokemons;
};

const getDbData = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllData = async () => {
  const apiData = await getApiData();
  const dbData = await getDbData();
  const allData = apiData.concat(dbData);
  return allData;
};

module.exports = { getAllData };
