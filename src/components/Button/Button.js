import React from 'react';
import './Button.css'

function Button({buttonText, mix, formValid, type, formId, formError, errorMessage}) {
  return (
    <>
      <span
        className={`button__error ${formError && 'button__error_type_visible'}`}>{errorMessage}</span>
      <button form={formId} type={type}
              className={`button button_type_${mix}`}
              disabled={!formValid}>{buttonText}</button>
    </>
  );
}

export default Button;
