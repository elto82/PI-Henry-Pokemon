import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

const LandingPage = () => {
  return (
    <div className={style.landingPage}>
      <h1 className={style.landingTitle}>welcome</h1>
      <Link to="/home">
        <button className={style.btonHome}>go home</button>
      </Link>
    </div>
  );
};

export default LandingPage;
