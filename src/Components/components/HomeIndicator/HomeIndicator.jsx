import React from "react";
import style from "./homeindicator.module.scss"
const HomeIndicator = (props) => {
    let br = {
        backgroundColor: props.styleValue
    };
    return(
        <div className={style.homeIndicator} style={br}>

        </div>
    )
}
export default HomeIndicator;