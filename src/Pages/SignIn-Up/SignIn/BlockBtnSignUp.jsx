import React from "react";
import style from "./signin.module.scss"
import {Link} from 'react-router-dom';

const BlockBtnSignUp = (props) => {
    return (
        <div className={style.blockBtnSignUp}>
            <p>{props.data.text}</p>
            <div className={style.absolPosition}>
                <Link className={style.btn_Signup} to='/SignUp'>{props.data.link}</Link>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;



