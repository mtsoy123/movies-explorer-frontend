import React, {useContext, useEffect, useState} from 'react';
import './Register.css'
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthContainer from '../AuthContainer/AuthContainer';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import Button from '../Button/Button';
import AuthCaption from '../AuthCaption/AuthCaption';
import {useFormWithValidation} from '../../hooks/useFormValidation';
import {mainApi} from '../../utils/MainApi';
import {useHistory} from 'react-router-dom';
import userContext from '../../context/userContext';

function Register({setLoggedIn}) {

  const history = useHistory()

  const {
    values,
    errors,
    isValid,
    resetForm,
    nameValidation,
    emailValidation,
    passwordValidation
  } = useFormWithValidation();

  const [formError, setFormError] = useState(false);
  const formId = 'signupForm';
  const {currentUser, setCurrentUser} = useContext(userContext)

  useEffect(() => {
    resetForm()
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;

    mainApi.signup(target.email.value, target.password.value, target.name.value)
    .then((res) => {
      if (res) {
        mainApi.signin(target.email.value, target.password.value)
      }
    })
    .then((token) => mainApi.getProfile(token))
    .then((res) => {
      setLoggedIn(true)
      setCurrentUser({
        email: res.email,
        name: res.name
      });
      history.push('/movies')
    })
    .catch((err) => {
      console.log(err)
      setFormError(true)
    })
  }

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
          onSubmit={handleSubmit}
          formId={formId}
        >
          <Input
            labelText="Имя"
            inputName="name"
            inputType="text"
            isRequired={true}
            handleChange={nameValidation}
            nameError={errors.name}
            inputValue={values.name}
          />
          <Input
            labelText="E-mail"
            inputName="email"
            inputType="text"
            isRequired={true}
            handleChange={emailValidation}
            nameError={errors.email}
            inputValue={values.email}
          />
          <Input
            labelText="Пароль"
            inputName="password"
            inputType="password"
            isRequired={true}
            handleChange={passwordValidation}
            nameError={errors.password}
            inputValue={values.password}
          />
          <Button
            buttonText="Зарегистрироваться"
            mix="register"
            formValid={isValid}
            type="submit"
            formId={formId}
            formError={formError}
            errorMessage="При регистрации произошла ошибка"
          />
        </AuthForm>

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
