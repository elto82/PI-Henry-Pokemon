import React, { useState } from "react";
import style from "./paged.module.css";

const Paged = ({ charactersPerPage, allCharacters, paginado }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
    paginado(number);
  };

  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={style.number} key={number}>
              <button
                className={
                  currentPage === number
                    ? `${style.a} ${style.active}`
                    : style.a
                }
                onClick={() => handleClick(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paged;
