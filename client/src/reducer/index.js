import {
  GET_CHARACTERS,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  GET_NAME_CHARACTERS,
  GET_TYPES,
  POST_CHARACTER,
  FILTER_BY_TYPES,
  GET_DETAILS,
} from "../actions/index.js";

const initialState = {
  characters: [],
  allCharacters: [],
  types: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      };

    case FILTER_CREATED:
      const createdFilter =
        action.payload === "created"
          ? state.allCharacters.filter((poke) => poke.cretedInBd)
          : state.allCharacters.filter((poke) => !poke.cretedInBd);
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharacters : createdFilter,
      };

    case ORDER_BY_NAME:
      let sortedArr =
        action.payload === "asc"
          ? state.allCharacters.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allCharacters.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allCharacters: sortedArr,
      };

    case ORDER_BY_ATTACK:
      let sortedAtack =
        action.payload === "asc"
          ? state.characters.sort(function (a, b) {
              return a.attack - b.attack;
            })
          : state.characters.sort(function (a, b) {
              return b.attack - a.attack;
            });
      return {
        ...state,
        characters: sortedAtack,
      };

    case GET_NAME_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    case POST_CHARACTER:
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };

    case FILTER_BY_TYPES:
      const { types } = action.payload;
      let filteredArr = [];
      if (types.length === 0) {
        filteredArr = state.allCharacters;
      } else {
        filteredArr = state.allCharacters.filter((poke) => {
          const pokeTypes =
            poke.types ||
            (poke.Types ? poke.Types.map((t) => t.name.toLowerCase()) : []);
          return types.some((type) => pokeTypes.includes(type.toLowerCase()));
        });
      }
      return {
        ...state,
        characters: filteredArr,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
