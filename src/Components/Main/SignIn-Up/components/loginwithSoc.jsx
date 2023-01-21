import React from "react";
import google_icon from "../../../../assets/images/Main/icons8-google.png"
import icon_facebook from "../../../../assets/images/Main/facebook.svg"

import style from "./loginwithSoc.module.scss"

const LoginwithSoc = () => {
   

function Handler () {
console.log("login with social");
}
   return (
    <div className={style.flex_container_login}>
        <button onClick={Handler}>
        <img src={icon_facebook} alt="icon_facebook" />
        </button>
        <button onClick={Handler}>
        <img src={google_icon} alt="google_icon" />
        </button>
    </div>
  );
};

export default LoginwithSoc;