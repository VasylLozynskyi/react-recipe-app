import {LoginwithSoc} from "../../../Components/components/loginwithsoc/loginwithSoc";
import React, { useState } from "react";
import style from "./formsignup.module.scss"
import { auth } from "../../../Components/utills/firebase";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../../../Components/utills/functions";


export const FormSignUp = (props) => {
    const [login, setLogin] = useState("");
    const [login_err, setLogin_err] = useState("");
    const [password, setPassword] = useState("");
    const [password_err, setPassword_err] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [confirmpassword_err, setConfirmpassword_err] = useState("");
    const [error_login_input, setError_login_input] = useState({});
    const [error_password_input, setError_password_input] = useState({});
    const [error_confirmpassword_input, setError_confirmpassword_input] = useState({});
    const [error, setError] = useState("");
    const [showError, setShowError] = useState({display: "none"});
    const navigate = useNavigate();
   
    const handleCreateLogin = (e) => {
        setLogin(e.target.value ? e.target.value : "" )
    }
    const handleCreatePassword = (e) => {
        setPassword(e.target.value ? e.target.value : "")
    }
    const handleConfirm = (e) => {
      setConfirmpassword(e.target.value ? e.target.value : "")
    }
    const handleCreateAccount = async (e) =>{
        e.preventDefault();
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

          if(!confirmpassword) {
            setError_confirmpassword_input({border: "1px solid red"})
            setConfirmpassword_err("Confirm Password field cannot be empty")
          } else if (confirmpassword !== password){
            setError_confirmpassword_input({border: "1px solid red"})
            setConfirmpassword_err("Confirm Password not equals Password")
          }else {
            setError_confirmpassword_input({})
            setConfirmpassword_err("")
          }

          //back-end part
          if (login && password && !password_err && !login_err && !confirmpassword_err){
            await createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                props.handleUser(user);
                createUserProfile(user);
                navigate("/react-recipe-app/home")
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
                setShowError({display: "flex"})
                // ..
            });
          }
          //
    }
    const handleCloseError = () => {
      setShowError({display: "none"});
    }
    return (
        <div className={style.signup_container}>
        <div className={style.signup}>
        <h2>Sign Up</h2>
        <form onSubmit={handleCreateAccount}>
                <label htmlFor="login" className={style.label}></label>
                    <input type="text"  id="login" name="login" placeholder="login (email)" 
                    onChange={handleCreateLogin} className={style.login_input} style={error_login_input} />
                    <div className={style.invalid_feedback}>{login_err}</div>
                <label htmlFor="password"></label>
                    <input type="password"  id="password" name="password" placeholder="Password" autoComplete="on" onChange={handleCreatePassword} className={style.password_input} style={error_password_input} />
                    <div className={style.invalid_feedback}>{password_err}</div>
                <label htmlFor="confirmpassword"></label>
                  <input type="password" id="confirmpassword" name="confirmpassword" autoComplete="on" placeholder="Confirm Password" onChange={handleConfirm} className={style.confirmpassword_input} style={error_confirmpassword_input} />
                  <div className={style.invalid_feedback}>{confirmpassword_err}</div>
                <button type="submit" id="submit" className={style.btn_submit}>Sign up</button>
            </form>
        </div>
        <LoginwithSoc />
            <div className={style.error_message} style={showError}>{error}
              <button className={style.closebtn} onClick={handleCloseError}>X</button>
            </div>
    </div>
    )
}