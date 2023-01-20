import React from "react";
import style from "./forms.module.scss"
// import LoginwithSoc from "./loginwithSoc";

  class FormSignIn extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        email: null, 
        password: null,
        errors: {
          email: '',
          password: '',
          login: '', 
        },
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
      
      let form_email = this.state.email, 
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
      } else if (form_password.length > 15){
        form_errors.password = "Password length must not exceed 15 characters";
      } else {
        form_errors.password = "";
      }
      // back-end part
      if(!has_errors){
        // let allUsers = [];
      }
      //

      this.setState({form_errors, [name]: value})
      
    }
    render() {
      
      let email_err = this.state.errors.email ? this.state.errors.email : '';
      let password_err = this.state.errors.password ? this.state.errors.password : '';
      let login_err = this.state.errors.login ? this.state.errors.login : '';
      
      let email_err_class = this.state.errors.email || this.state.errors.login ?  `${style.is_invalid}` : "";

      console.log(email_err_class);
      let password_err_class = this.state.errors.password || this.state.errors.login ? `${style.is_invalid}` : ``;
      // const typeOfLogin = [
      //   "GMAIL",
      //   "FACEBOOK"
      // ];
      return ( // className={}}
        <div className={style.wrapper_form}>
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
          <hr/>
          {/* <LoginwithSoc typeOfLogin={typeOfLogin} />      */}
        </div>
      );
    }
  }
export default FormSignIn;
