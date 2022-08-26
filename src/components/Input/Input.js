import React from 'react';
import './Input.css'

function Input({
                 labelText,
                 isRequired,
                 handleChange,
                 inputValue,
                 nameError,
                 inputName,
                 inputType,
               }) {

  return (
    <label
      className="input input__label">
      {labelText}
      <input onChange={handleChange} value={inputValue || ''} required={isRequired} type={inputType}
             className="input__input" name={inputName}/>
      <span className="input__error-message">{nameError || ' '}</span>
    </label>
  );
}

export default Input;
