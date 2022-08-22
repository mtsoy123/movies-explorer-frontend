import React, {useContext, useEffect, useState} from 'react';
import './Login.css'
import Input from '../Input/Input';
import Button from '../Button/Button';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthCaption from '../AuthCaption/AuthCaption';
import AuthContainer from '../AuthContainer/AuthContainer';
import AuthForm from '../AuthForm/AuthForm';
import {useHistory} from 'react-router-dom';
import {useFormWithValidation} from '../../hooks/useFormValidation';
import {mainApi} from '../../utils/MainApi';
import userContext from '../../context/userContext';

function Login({setLoggedIn}) {
  const history = useHistory();
  const {
    values,
    errors,
    isValid,
    resetForm,
    emailValidation,
    passwordValidation
  } = useFormWithValidation();
  const [formError, setFormError] = useState(false);
  const formId = 'signinForm';
  const {setCurrentUser} = useContext(userContext)

  useEffect(() => {
    resetForm()
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    mainApi.signin(target.email.value, target.password.value)
    .then((token) => {
      return mainApi.getProfile(token)
    })
    .then((res) => {
      console.log(res)
      if (res) {
        setLoggedIn(true)
        setCurrentUser({
          email: res.email,
          name: res.name
        });
        history.push('/movies')
      } else {
        throw new Error
      }
    })
    .catch(() => {
      setFormError(true)
    })
  }

  return (
    <>
      <AuthHeader
        titleText="Рады видеть!"
      />
      <main className="login">
        <AuthContainer>
          <AuthForm
            onSubmit={handleSubmit}
            mix="signin"
            formId={formId}
          >
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
              buttonText="Войти"
              mix="login"
              formValid={isValid}
              type="submit"
              formId={formId}
              formError={formError}
              errorMessage="При авторизации произошла ошибка"
            />
          </AuthForm>
          <AuthCaption
            captionText="Ещё не зарегистрированы?"
            linkText="Регистрация"
            linkTo="/signup"
          />
        </AuthContainer>
      </main>
    </>
  );
}

export default Login;
