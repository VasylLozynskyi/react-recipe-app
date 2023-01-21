import React from "react";
import style from "./forms.module.scss"
import LoginwithSoc from "./loginwithSoc";
import Users from "../../../../data/Users"
import {Link} from "react-router-dom";
import { useState } from "react";

  class FormSignIn extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        email: null, 
        password: null,
        login: {
          login: false,
        },
        errors: {
          email: '',
          password: '',
          login: '', 
        },
        linkUser: "#",
      };
    }
    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }
    forgotPassHandler = (event) => {
      event.preventDefault();
      console.log("Open pop-up fiwh validation");

    }
    handleSubmit = async (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      
      let form_login = this.state.login,
          form_email = this.state.email, 
          form_password = this.state.password,
          form_errors = this.state.errors;
      
      let has_errors = false;
      
      if(form_email === null || form_email.length === 0){
        form_errors.email = "Email field cannot be empty";
        has_errors = true;
      }else{
        // Regex control
        if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(form_email)){
          form_errors.email = "Please enter a valid email";
          has_errors = true;
        }else{
          form_errors.email = "";
        }
      }
      
      if(form_password === null || form_password.length === 0){
        form_errors.password = "Password field cannot be empty";
        has_errors = true;
      }else if (form_password.length < 8){
        form_errors.password = "Password length must be atleast 8 characters";
        has_errors = true;
      } else if (form_password.length > 15){
        form_errors.password = "Password length must not exceed 15 characters";
        has_errors = true;
      } else {
        form_errors.password = "";
      }
      // back-end part
      if(!has_errors){
        
        // user Post to server

        let user = [];
        user = Users.filter(user => user.email === this.state.email);
        this.state.linkUser = user[0].id;
        
        
          if (user) {
          form_login.login = true;
          this.setState({form_login, [name]: value})
          }
       
        
        }
      //
     
      this.setState({form_errors, [name]: value})
    }
    closeHandler = (e) => {
      e.target.style.display = "none";
    }
    render() {
      
      let link = ``;
      let hidden_Ok = {};
      let hidden_false = {};
      if (this.state.login.login){
        link = `/user/${this.state.linkUser}`;
        hidden_Ok = { display: "block"};
      } else if (this.state.errors.email || this.state.errors.password) hidden_false = { display: "block"};
      
    
      let email_err = this.state.errors.email ? this.state.errors.email : '';
      let password_err = this.state.errors.password ? this.state.errors.password : '';
      let login_err = this.state.errors.login ? this.state.errors.login : '';
      let email_err_class = this.state.errors.email || this.state.errors.login ?  `${style.is_invalid}` : "";
      let password_err_class = this.state.errors.password || this.state.errors.login ? `${style.is_invalid}` : ``;
      const typeOfLogin = [
        "GMAIL",
        "FACEBOOK"
      ];
      return ( // className={}}
        <div className={style.wrapper_form} >
          <form onSubmit={this.handleSubmit}>
            <div className={style.form_group}>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" name="email" placeholder="E-mail" onChange={this.handleChange} className={email_err_class}/>
                <div className={style.invalid_feedback}>{email_err}</div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} className={password_err_class}/>
                <div className={style.invalid_feedback}>{password_err}</div>
            </div>
            <div className={style.forgot_pass}><a href='#' onClick={this.forgotPassHandler}>Forgot password?</a></div>
              <button type="submit" id="submit" className={style.btn_block}>Sign in<span>➡</span></button>
          </form>
          <div className={style.text_danger}>{login_err}</div>
          <LoginwithSoc typeOfLogin={typeOfLogin} />  
          <div style={hidden_Ok} className={style.popup}>
            Hello
            <hr/>
            <Link to = {link}>Go to</Link>
          </div> 
          <div style={hidden_false} className={style.popup} onClick={this.closeHandler}>
            Enter correct email or password
          </div> 
        </div>
      );
    }
  }
export default FormSignIn;
