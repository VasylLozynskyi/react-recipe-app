import React, { useState } from "react";
import { auth } from "../../../Components/utills/firebase";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../../../Components/utills/functions";
import { FormSignUp } from "./FormSignUp";


export const FormSignUpContainer = (props) => {
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
                navigate("/home")
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
      <FormSignUp
      data={props.data}
        handleCreateAccount={handleCreateAccount}
        handleCreateLogin={handleCreateLogin}
        handleCreatePassword={handleCreatePassword}
        handleConfirm={handleConfirm}
        handleCloseError={handleCloseError}
        error_login_input={error_login_input}
        error_password_input={error_password_input}
        error_confirmpassword_input={error_confirmpassword_input}
        showError={showError}
        login_err={login_err}
        password_err={password_err}
        confirmpassword_err={confirmpassword_err}
        error={error}
      />
    )
}