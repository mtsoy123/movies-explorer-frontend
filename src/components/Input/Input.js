import React from 'react';
import './Input.css'

function Input({labelText}) {
  return (
    <label className='input input__label input__label-divider'>
      {labelText}
      <input className='input__input'/>
    </label>
  );
}

export default Input;
