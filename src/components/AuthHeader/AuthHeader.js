import React from 'react';
import './AuthHeader.css'
import logo from '../../images/logo.svg';

function AuthHeader({titleText}) {
  return (
    <header className='auth-header'>
      <img className='auth-header__logo' src={logo} alt='Логотип'/>
      <h1 className='auth-header__title'>{titleText}</h1>
    </header>
  );
}

export default AuthHeader;
