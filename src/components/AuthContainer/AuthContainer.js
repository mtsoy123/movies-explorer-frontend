import React from 'react';
import './AuthContainer.css'

function AuthContainer({children}) {
  return (
    <section className='auth-container'>
      {children}
    </section>
  );
}

export default AuthContainer;
