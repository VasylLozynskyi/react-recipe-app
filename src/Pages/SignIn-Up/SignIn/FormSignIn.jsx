import React, {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import style from "./formsignin.module.scss"
import { auth } from "../../../Components/utills/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

import {LoginwithSoc} from "../../../Components/components/loginwithsoc/loginwithSoc";

export const FormSignIn = (props) => {
  useEffect(() => {
    setShowPopup(props.show_popup)
}, [props.show_popup])
const [login, setLogin] = useState("");
const [login_err, setLogin_err] = useState("");
const [password, setPassword] = useState("");
const [password_err, setPassword_err] = useState("");
const [error_login_input, setError_login_input] = useState({});
const [error_password_input, setError_password_input] = useState({});
const [show_popup, setShowPopup] = useState({display: "none"});
const [error, setError] = useState("");
const [showError, setShowError] = useState({display: "none"});
const navigate = useNavigate();

const handleChangeLogin = (e) => {
    setLogin(e.target.value ? e.target.value : "" )
}
const handleChangePassword = (e) => {
    setPassword(e.target.value ? e.target.value : "")
}

const handleSubmit = (e) =>{
    if (!login){
        setError_login_input({border: "1px solid red"})
        setLogin_err("Login field cannot be empty")
    } else if(login.length < 4){
        setError_login_input({border: "1px solid red"})
        setLogin_err("Login field cannot be less 4 chars")
        } else {
            setError_login_input({})
            setLogin_err("") 
        }

     if(!password) {
        setError_password_input({border: "1px solid red"})
        setPassword_err("Password field cannot be empty")
     }else if (password.length < 6){
        setError_password_input({border: "1px solid red"})
        setPassword_err("Password field cannot be less 6 chars")
      } else if (password.length > 15){
        setError_password_input({border: "1px solid red"})
        setPassword_err("Password field cannot be more then 15 chars")
      } else {
        setError_password_input({})
        setPassword_err("")
      }
      //back-end part
      if (login && password && !password_err && !login_err){
        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            props.handleUser(user);
            navigate(`/react-recipe-app/home`);
            window.localStorage.setItem("userLoginREcipeApp", JSON.stringify(user));
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
            setShowError({display: "flex"})
        });
       }
      e.preventDefault();
      //
}
const handleCloseError = () => {
  setShowError({display: "none"});
}
const handleLoginGuest = () => {
  signInWithEmailAndPassword(auth, "guest.recipe@gmail.com", "123456789")
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            props.handleUser(user);
            navigate("/react-recipe-app/home");
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
            setShowError({display: "flex"})
        });
}
const handleForgotPassword = () => {
    console.log("forgot password");
   }

return (
    <div className={style.signin_container} style={show_popup} >
            <div className={style.signin}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                        <input type="text"  id="login" name="login" placeholder="login (email)"
                        onChange={handleChangeLogin} className={style.login_input} style={error_login_input} />
                        <div className={style.invalid_feedback}>{login_err}</div>
                        <input type="text"  id="password" name="password" placeholder="Password" 
                        onChange={handleChangePassword} className={style.password_input} style={error_password_input} />
                        <div className={style.invalid_feedback}>{password_err}</div>
                    <button type="submit" id="submit" className={style.btn_submit}>Sign in</button>
                    <div className={style.guest}>
                      <p>Login as <span onClick={handleLoginGuest}>Guest</span></p>
                    </div>
                </form>
                    <div className={style.forgot_pass} onClick={handleForgotPassword}>
                      Forgot password?
                    </div>
            </div>
            <div className={style.soclog}>
              <LoginwithSoc />
            </div>
            <div className={style.error_message} style={showError}>{error}
              <button className={style.closebtn} onClick={handleCloseError}>X</button>
            </div>
        </div>
  )
}