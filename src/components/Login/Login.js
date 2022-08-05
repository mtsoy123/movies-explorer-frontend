import React from 'react';
import './Login.css'
import Input from '../Input/Input';
import Button from '../Button/Button';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthCaption from '../AuthCaption/AuthCaption';
import AuthContainer from '../AuthContainer/AuthContainer';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {
  return (
    <main className='login'>
      <AuthHeader
        titleText='Рады видеть!'
      />
      <AuthContainer>
        <AuthForm>
          <Input labelText='E-mail'/>
          <Input labelText='Пароль'/>
        </AuthForm>
        <Button
          mix='login'
          buttonText='Войти'
        />
        <AuthCaption
          captionText='Ещё не зарегистрированы?'
          linkText='Регистрация'
          linkTo='/signup'
        />
      </AuthContainer>
    </main>
  );
}

export default Login;
