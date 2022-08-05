import React from 'react';
import './AuthForm.css'

function AuthForm({children, mix}) {
  return (
    <form className={`auth-form auth-form_type_${mix}`}>
      {children}
    </form>
  );
}

export default AuthForm;
