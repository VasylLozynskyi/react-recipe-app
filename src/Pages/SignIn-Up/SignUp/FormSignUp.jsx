import React from "react";
import style from "./formsignup.module.scss";

export const FormSignUp = (props) => {
  const data = props.data;
  return (
    <div className={style.signup_container}>
      <div className={style.signup}>
        <h2>{data.title}</h2>
        <form onSubmit={props.handleCreateAccount}>
          <label htmlFor="login" className={style.label}></label>
          <input
            type="text"
            id="login"
            name="login"
            placeholder={data.placeholderLogin}
            onChange={props.handleCreateLogin}
            className={style.login_input}
            style={props.error_login_input}
          />
          <div className={style.invalid_feedback}>{props.login_err}</div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder={data.placeholderPassword}
            autoComplete="on"
            onChange={props.handleCreatePassword}
            className={style.password_input}
            style={props.error_password_input}
          />
          <div className={style.invalid_feedback}>{props.password_err}</div>
          <label htmlFor="confirmpassword"></label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            autoComplete="on"
            placeholder={data.placeholderConfirm}
            onChange={props.handleConfirm}
            className={style.confirmpassword_input}
            style={props.error_confirmpassword_input}
          />
          <div className={style.invalid_feedback}>
            {props.confirmpassword_err}
          </div>
          <button type="submit" id="submit" className={style.btn_submit}>
            {data.buttonName}
          </button>
        </form>
      </div>
      <div className={style.error_message} style={props.showError}>
        {props.error}
        <button className={style.closebtn} onClick={props.handleCloseError}>
          {data.buttonCloseErr}
        </button>
      </div>
    </div>
  );
};
