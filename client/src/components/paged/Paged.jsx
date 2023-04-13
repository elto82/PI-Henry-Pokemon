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

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginado(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginado(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className={style.paginado}>
        <li>
          <button
            className={style.a}
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li className={style.number} key={number}>
            <button
              className={
                currentPage === number ? `${style.a} ${style.active}` : style.a
              }
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className={style.a}
            onClick={handleNextClick}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paged;
