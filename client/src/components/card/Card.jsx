import React from "react";
import style from "./card.module.css";

const Card = ({ name, image, types, attack }) => {
  return (
    <div className={style.cardContainer}>
      <h2 className={style.name}>{name}</h2>
      <h6>Attack: {attack}</h6>
      <img className={style.image} src={image} alt="img not fount" />
      <h3 className={style.types}>{types}</h3>
    </div>
  );
};

export default Card;
