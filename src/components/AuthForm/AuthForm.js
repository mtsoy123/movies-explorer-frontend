import React from 'react';
import './AuthForm.css'

function AuthForm({children, mix, onSubmit, formId}) {
  return (
    <form className={`auth-form auth-form_type_${mix}`} onSubmit={onSubmit} id={formId}>
      {children}
    </form>
  );
}

export default AuthForm;
