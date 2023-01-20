import React from "react";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import google_icon from "../../../../assets/images/Main/icons8-google.png"
import icon_facebook from "../../../../assets/images/Main/facebook.svg"
import style from "./loginwithSoc.module.scss"

const LoginwithSoc = (props) => {
      const responseGoogle = response => {
        props.callback({
          type: "GMAIL",
          payload: response
        })
      }
      const responseFacebook = response => {
        console.log(response);
      }
      const types = props.typeOfLogin;
      const text = props;
      const btnStyles = {
          width: "44px",
          height: "44px",
          backgroundColor: "white", 
          // color: "white", 
          fontSize: "2em" ,
          boxShadow: "0px 0px 5px 3px rgba(105, 105, 105, 0.1)",
          borderRadius: "10px",
          margin: "0",
      };
  
      function showGmail() {
        return (
          <div>
            <GoogleLogin
          clientId="491004959702-3bgqo54pt777f77dgl7cqd6s7e7rii81.apps.googleusercontent.com"
          buttonText={`${text.GMAIL ? ` ${text.GMAIL}` : 'LOGIN WITH GOOGLE'}`}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          
          render={renderProps => (
            <button 
            style={btnStyles} 
            onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <img src={google_icon} alt="icon_google"/>
            </button>
          )}
          />
        </div>
        )
      }
    
      function showFB() {
        return (
        <div>
          <FacebookLogin
          appId="1088597931155576"
          autoLoad={false}
          callback={responseFacebook}
          render={renderProps => (
            <button style={btnStyles} onClick={renderProps.onClick}>
              <img src={icon_facebook} alt="icon_facebook"/>
            </button>
          )}
          />
          </div>
 )
      }

      return (
            <div className={style.flex_container_login}>
              {
                types.includes("GMAIL") ? showGmail() : null
              }
              {
                types.includes("FACEBOOK") ? showFB() : null
              }
            </div>
      );
}
export default LoginwithSoc;