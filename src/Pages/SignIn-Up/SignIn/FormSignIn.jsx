import React from "react";
import style from "./formsignin.module.scss";

export const FormSignIn = (props) => {
  const data = props.data;
  return (
    <div className={style.signin_container} style={props.show_popup}>
      <div className={style.signin}>
        <h2>{data.title}</h2>
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            id="login"
            name="login"
            placeholder={data.placeholderLogin}
            onChange={props.handleChangeLogin}
            className={style.login_input}
            style={props.error_login_input}
          />
          <div className={style.invalid_feedback}>{props.login_err}</div>
          <input
            type="text"
            id="password"
            name="password"
            placeholder={data.placeholderPassword}
            onChange={props.handleChangePassword}
            className={style.password_input}
            style={props.error_password_input}
          />
          <div className={style.invalid_feedback}>{props.password_err}</div>
          <button type="submit" id="submit" className={style.btn_submit}>
            {data.buttonIn}
          </button>
          <div className={style.guest}>
            <p>
              {data.textGuest}
              <span onClick={props.handleLoginGuest}>{data.nameGuest}</span>
            </p>
          </div>
        </form>
        <div className={style.forgot_pass} onClick={props.handleForgotPassword}>
          {data.textForgot}
        </div>
      </div>
      <div className={style.soclog}></div>
      <div className={style.error_message} style={props.showError}>
        {props.error}
        <button className={style.closebtn} onClick={props.handleCloseError}>
          {data.buttonCloseErr}
        </button>
      </div>
    </div>
  );
};