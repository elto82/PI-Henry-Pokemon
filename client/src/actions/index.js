import axios from "axios";

export const GET_CHARACTERS = "GET_CHARACTERS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const GET_NAME_CHARACTERS = "GET_NAME_CHARACTERS";
export const GET_TYPES = "GET_TYPES";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const POST_CHARACTER = "POST_CHARACTER";

export function getCharacters() {
  return async function (dispatch) {
    let response = await axios.get("/pokemons");
    return dispatch({
      type: GET_CHARACTERS,
      payload: response.data,
    });
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function getNameCharacters(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons?name=${name}`);
      return dispatch({
        type: GET_NAME_CHARACTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const response = await axios.get("/types");
    return dispatch({
      type: GET_TYPES,
      payload: response.data,
    });
  };
}

export function filterByTypes(payload) {
  return {
    type: FILTER_BY_TYPES,
    payload,
  };
}

export function postCharacter(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/pokemons/post", payload);
      return dispatch({
        type: POST_CHARACTER,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/pokemons/${id}`);
      //console.log(json.data);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
