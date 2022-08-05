import React from 'react';
import './Register.css'
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthContainer from '../AuthContainer/AuthContainer';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import Button from '../Button/Button';
import AuthCaption from '../AuthCaption/AuthCaption';

function Register(props) {
  return (
    <main className="register">
      <AuthHeader
        titleText="Добро пожаловать!"
      />
      <AuthContainer
        mix="register"
      >
        <AuthForm
          mix="register"
        >
          <Input
            labelText="Имя"
          />
          <Input
            labelText="E-mail"
          />
          <Input
            labelText="Пароль"
          />
        </AuthForm>
        <Button
          buttonText="Зарегистрироваться"
          mix="register"
        />
        <AuthCaption
          captionText="Уже зарегистрированы?"
          linkText="Войти"
          linkTo="/signin"
        />
      </AuthContainer>
    </main>
  );
}

export default Register;
