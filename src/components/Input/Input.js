import React from 'react';
import './Input.css'

function Input({labelText}) {
  return (
    <label className="input input__label">
      {labelText}
      <input className="input__input"/>
    </label>
  );
}

export default Input;
