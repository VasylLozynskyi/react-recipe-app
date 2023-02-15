import React from "react";
import iconHat from "../../assets/images/Main/iconHat.png";
import style from "./firstPage.module.scss";
import HomeIndicator from "../../Components/components/HomeIndicator/HomeIndicator";
import { Link } from "react-router-dom";

const FirstPage = (props) => {
  const data = props.dataSite;
  return (
    <div className={style.wrapper_firstpage}>
      <div className={style.firstPage_section}>
        <img src={iconHat} alt="iconHat img first page" />
        <p>{data.subMainText}</p>
      </div>
      <div className={style.headerH1}>
        <h1>{data.title}</h1>
        <p>{data.subTitle}</p>
        <Link to="/login" className={style.btnStartCooking}>
          <button>{data.link}</button>
        </Link>
      </div>
      <HomeIndicator styleValue="white" />
    </div>
  );
};
export default FirstPage;
