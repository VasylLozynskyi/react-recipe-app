import React from "react";
import style from "./signup.module.scss"
import {Link} from 'react-router-dom';

const BlockBtnSignUp = (props) => {
    return (
        <div className={style.blockBtnSignIn}>
            <p>{props.data.text}</p>
            <div className={style.absolPosition}>
                <Link className={style.btn_Signin} to='/login'>{props.data.link}</Link>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;



