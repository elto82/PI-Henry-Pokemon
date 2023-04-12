import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index.js";
import style from "./detail.module.css";

const Detail = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDetail(props.match.params.id)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, props.match.params.id]);

  const myCharacter = useSelector((state) => state.details);

  return (
    <div className={style.containerPage}>
      {isLoading ? (
        <p className={style.loadingDetail}>loading...</p>
      ) : (
        myCharacter.length > 0 && (
          <>
            <div className={style.containerImage}>
              <div>
                <Link to={"/home"}>
                  <button className={style.btnHome}>Back</button>
                </Link>
              </div>
              <h1 className={style.name}>{myCharacter[0].name}</h1>
              <img
                className={style.image}
                src={myCharacter[0].image}
                alt="not found"
              />
            </div>
            <div className={style.containerDetails}>
              <label>Life:</label>
              <h3 className={style.hpDetail}>{myCharacter[0].hp}</h3>
              <label>Attack:</label>
              <h3 className={style.attackDetail}>{myCharacter[0].attack}</h3>
              <label>Defense:</label>
              <h3 className={style.defenseDetail}>{myCharacter[0].defense}</h3>
              <label>Speed:</label>
              <h3 className={style.speedDetail}>{myCharacter[0].speed}</h3>
              <label>Height:</label>
              <h3 className={style.heightDetail}>{myCharacter[0].height}</h3>
              <label>Weight:</label>
              <h3 className={style.weightDetail}>{myCharacter[0].weight}</h3>
              <label>Types:</label>
              <h3 className={style.typesDetail}>
                {myCharacter[0].types
                  ? myCharacter[0].types
                  : myCharacter[0].Types?.map((poke) => poke.name + " ")}
              </h3>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Detail;
