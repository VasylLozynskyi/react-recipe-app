import React from "react";
import iconHat from "../../assets/images/Main/iconHat.png";
import style from "./firstPage.module.scss";
import HomeIndicator from "../../Components/components/HomeIndicator/HomeIndicator";
import {Link} from 'react-router-dom';

const FirstPage = () => {
        return (
            <div className={style.wrapper_firstpage}>
                <div className={style.firstPage_section}>
                    <img src={iconHat} alt="iconHat img first page" />
                    <p>100K+ Premium Recipe</p>
                </div>
                <div className={style.headerH1}>
                    <h1>Get Cooking</h1>
                    <p>Simple way to find Tasty Recipe</p>
                    <Link to="/react-recipe-app/login" className={style.btnStartCooking}><button>Start Cooking</button></Link>
                </div>
                <HomeIndicator style = "white" />
            </div>
            )
}
export default FirstPage;