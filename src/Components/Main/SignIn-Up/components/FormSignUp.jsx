import React from "react";
import style from "./formsignup.module.scss"
import LoginwithSoc from "./loginwithSoc";

  class FormSignUp extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        email: null, 
        password: null,
        confirmpassword: false,
        name: null,
        accept: false,
        errors: {
          accept: true,
          name: '',
          email: '',
          password: '',
          confirmpassword: "",
          login: '', 
        },
      };
    }
    handleChange = (event) => {
     if (event.target.type === "checkbox"){
      this.setState({ [event.target.name]: event.target.checked });
     } else this.setState({ [event.target.name]: event.target.value });
    }
    forgotPassHandler = (event) => {
      event.preventDefault();
      console.log("Open pop-up with validation");

    }
    handleSubmit = async (event) => {
      event.preventDefault();
      
      const { name, value } = event.target;
      
      let form_accept = this.state.accept, 
          form_name = this.state.name, 
          form_email = this.state.email, 
          form_password = this.state.password,
          form_confirmpassword = this.state.confirmpassword,
          form_errors = this.state.errors;
      
      let has_errors = false;

      if(!form_accept){
        has_errors = true;
        form_errors.accept = false;
      } else form_errors.accept = true;
      if(form_name === null || form_name.length === 0){
        form_errors.name = "Name field cannot be empty";
        has_errors = true;
      } else if (form_name.length < 4){
        form_errors.name = "Name length must be atleast 3 characters";
        has_errors = true;
      } else form_errors.name = "";

      console.log(form_email);
      if(form_email === null || form_email.length === 0){
        form_errors.email = "Email field cannot be empty";
        has_errors = true;
      }else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(form_email)){
           // Regex control
          form_errors.email = "Please enter a valid email";
          has_errors = true;
        }else{
          form_errors.email = "";
        }
      
      
      if (form_password === null || form_password.length === 0){
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

      if(form_confirmpassword === false || form_confirmpassword.length === 0){
        form_errors.confirmpassword = "Confirm Password field cannot be empty";
        has_errors = true;
      } else if (form_confirmpassword !== form_password) {
        form_errors.confirmpassword = "Confirm Password false";
        has_errors = true;
      } else form_errors.confirmpassword = "";

      // back-end part
      if(!has_errors){
      let user = {};
      let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
      let str = '';
      for (var i = 0; i < 6; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
      }
      user.id = str;
      user.name = this.state.name;
      user.password = this.state.password;
      user.email = this.state.email;
      user.imgSrc = "";

      // user Post to server
      }
      //

      this.setState({form_errors, [name]: value})
      
    }
    render() {
      let name_err = this.state.errors.name ? this.state.errors.name : "";
      let email_err = this.state.errors.email ? this.state.errors.email : '';
      let password_err = this.state.errors.password ? this.state.errors.password : '';
      let confirmpassword_err = this.state.errors.confirmpassword ? this.state.errors.confirmpassword : '';
      let login_err = this.state.errors.login ? this.state.errors.login : '';
      let name_err_class = this.state.errors.name || this.state.errors.login ?  `${style.is_invalid}` : "";
      let email_err_class = this.state.errors.email || this.state.errors.login ?  `${style.is_invalid}` : "";
      let password_err_class = this.state.errors.password || this.state.errors.login ? `${style.is_invalid}` : ``;
      let confirmpassword_err_class = this.state.errors.confirmpassword || this.state.errors.login ? `${style.is_invalid}` : ``;
      let accept_error_class = !this.state.accept && !this.state.errors.accept ? {color: "red"} : {color: "#FF9C00"};
      let border_checkbox_error_class = !this.state.accept && !this.state.errors.accept ? {border: "1px solid red"} : {border: "1px solid #FF9C00"};
      const typeOfLogin = [
        "GMAIL",
        "FACEBOOK"
      ];
      return ( // className={}}
        <div className={style.wrapper_form}>
          <form onSubmit={this.handleSubmit}>
            <div className={style.form_group}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Name" onChange={this.handleChange} className={name_err_class}/>
                <div className={style.invalid_feedback}>{name_err}</div>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="new-email" name="email" placeholder="E-mail" onChange={this.handleChange} className={email_err_class}/>
                <div className={style.invalid_feedback}>{email_err}</div>
                <label htmlFor="password">Password</label>
                <input type="password" id="new-password" name="password" placeholder="Password" onChange={this.handleChange} className={password_err_class}/>
                <div className={style.invalid_feedback}>{password_err}</div>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" onChange={this.handleChange} className={confirmpassword_err_class}/>
                <div className={style.invalid_feedback}>{confirmpassword_err}</div>
            </div>
                <label style = {accept_error_class}  className={style.labelcheckade} htmlFor="accept" onChange={this.handleChange}>
                  <input className={style.checked} type="checkbox" name="accept" id="accept"/>
                  <span style = {border_checkbox_error_class} className={style.checkmark}></span>
                  Accept terms & Condition
                </label>
            <button type="submit" id="submit" className={style.btn_block}>Sign up<span>➡</span></button>
          </form>
          <div className={style.text_danger}>{login_err}</div>
          <LoginwithSoc typeOfLogin={typeOfLogin} />
        </div>
      );
    }
  }
export default FormSignUp;
