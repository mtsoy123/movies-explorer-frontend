import React from 'react';
import './AuthCaption.css'
import {Link} from 'react-router-dom';

function AuthCaption({captionText, linkText, linkTo}) {
  return (
    <p className='auth-caption'>{captionText} <Link className='auth-caption__link' to={linkTo}>{linkText}</Link> </p>
  );
}

export default AuthCaption;
