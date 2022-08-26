import React from 'react';
import './AuthHeader.css'
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function AuthHeader({titleText}) {
  return (
    <header className="auth-header">
      <Link to="/">
        <img className="auth-header__logo" src={logo} alt="logo"/>
      </Link>
      <h1 className="auth-header__title">{titleText}</h1>
    </header>
  );
}

export default AuthHeader;
