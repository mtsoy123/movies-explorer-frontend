import React from 'react';
import './Button.css'

function Button({buttonText, mix}) {
  return (
    <button className={`button button_type_${mix}`}>{buttonText}</button>
  );
}

export default Button;
