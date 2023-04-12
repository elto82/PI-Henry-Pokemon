import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  filterCreated,
  orderByName,
  orderByAttack,
  filterByTypes,
  getTypes,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paged from "../paged/Paged";
import SearchBar from "../search/SearchBar";
import style from "./home.module.css";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const allCharacters = useSelector((state) => state.characters);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharaterPerPage] = useState(12);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = allCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCharacters()).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleClickReload = (e) => {
    setIsLoading(true);
    dispatch(getCharacters()).then(() => setIsLoading(false));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  const handleSelectType = (e) => {
    dispatch(filterByTypes({ types: [e.target.value] }));
  };

  const handleSort = (e) => {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleAttackSort = (e) => {
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado por ataque ${e.target.value}`);
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={style.homeContainer}>
      <Link className={style.navegate} to="/pokemon">
        Create Pokemon
      </Link>

      <h1>All pokemons</h1>

      <button className={style.btonReload} onClick={handleClickReload}>
        Reload
      </button>

      <div className={style.container}>
        <select onChange={handleSort} className={style.selectOrden}>
          <option>Order by name</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>

        <select onChange={handleAttackSort} className={style.selectOrden}>
          <option>Order by attack</option>
          <option value="asc">less attack</option>
          <option value="desc">major attack</option>
        </select>

        <select onChange={handleFilterCreated} className={style.selectOrden}>
          <option>filter by source</option>
          <option value="All">All pokemons</option>
          <option value="created">Created in database</option>
          <option value="api">Created in the api</option>
        </select>

        <select className={style.selectOrden} onChange={handleSelectType}>
          {types.map((type, index) => (
            <option className={style.optionForm} key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <Paged
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          paginado={paginado}
        />
        <SearchBar isLoading={isLoading} setIsLoading={setIsLoading} />
        {isLoading ? (
          <div className={style.loading}>Loading...</div>
        ) : (
          <div className={style.containerCards}>
            {currentCharacters?.map((poke) => (
              <div
                onClick={() => history.push(`/home/${poke.id}`)}
                key={poke.id}
              >
                <Card
                  name={poke.name}
                  attack={poke.attack}
                  image={poke.image || "https://fondosmil.com/fondo/14716.jpg"}
                  types={
                    poke.types
                      ? poke.types.join(", ")
                      : poke.Types?.map((el) => el.name).join(", ")
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
