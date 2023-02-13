import React, {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { auth } from "../../../Components/utills/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormSignIn } from "./FormSignIn";

export const FormSignInContainer = (props) => {
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
            navigate(`/home`);
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
            navigate("/home");
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
  <FormSignIn
  data={props.data}
  show_popup={show_popup}
  error_login_input={error_login_input}
  login_err={login_err}
  error_password_input={error_password_input}
  password_err={password_err}
  showError={showError}
  error={error}
  handleSubmit={handleSubmit}
  handleChangeLogin={handleChangeLogin}
  handleChangePassword={handleChangePassword}
  handleLoginGuest={handleLoginGuest}
  handleForgotPassword={handleForgotPassword}
  handleCloseError={handleCloseError}
  />
  )
}