// LoginPage.js
import React from "react";
import { Login, LoginForm } from "react-admin";
import Button from '@material-ui/core/Button';

const CustomLoginForm = props => (
  <div>
    <div style={{fontFamily: "monospace", marginLeft: '15px'}}>
      <p>Digite seu email e senha cadastrados</p>
    </div>
    <LoginForm {...props} />
    <a href="https://fabianocorrea.com/" className="goToSite">IR PARA O SITE</a>
  </div>
);

const CustomLoginPage = props => (
  <Login {...props}>
    <CustomLoginForm {...props}/>
  </Login>
);

export default CustomLoginPage;