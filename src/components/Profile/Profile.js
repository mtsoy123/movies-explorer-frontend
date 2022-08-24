import React, {useContext, useEffect, useState} from 'react';
import './Profile.css'
import Header from '../Header/Header';
import userContext from '../../context/userContext';
import {mainApi} from '../../utils/MainApi';
import {useFormWithValidation} from '../../hooks/useFormValidation';
import {useHistory} from 'react-router-dom';

function Profile({menuOpened, setMenuOpened, loggedIn, setLoggedIn}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(false)
  const {values, errors, nameValidation, emailValidation} = useFormWithValidation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [formError, setFormError] = useState(false);

  function edit() {
    setIsEdit(!isEdit);
    setIsDisabled(!isDisabled);
    validateSameValue();
  }

  const {currentUser, setCurrentUser} = useContext(userContext);
  const history = useHistory();
  const {name, email} = currentUser;
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setNameValue(name);
    setEmailValue(email);
  }, [])

  function handleNameChange(event) {
    nameValidation(event);
    setNameValue(event.target.value)
  }

  function handleEmailChange(event) {
    emailValidation(event);
    setEmailValue(event.target.value);
  }

  useEffect(() => {
    validateSameValue();
  }, [nameValue, emailValue])

  function validateSameValue() {
    if ((errors.name || errors.email) || isEdit && (((nameValue === name) && (emailValue === email)) || ((nameValue === '') || (nameValue === '')))) {
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage('')
    setFormError(false);

    mainApi.updateProfile(nameValue, emailValue)
    .then(res => {
      setCurrentUser(res)
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500)
    })
    .catch(err => {
      console.log(err)
      setErrorMessage('Указаный email принадлежит другому пользователю')
      setFormError(true);
      setIsEdit(true);
      setIsDisabled(!isDisabled);
    })
  }

  function handleSignout() {
    mainApi.signOut()
    .then(() => {
      setCurrentUser({});
      setLoggedIn(false);
      setCurrentUser({});
      localStorage.removeItem('jwt');
      localStorage.removeItem('moviesArr');
      localStorage.removeItem('inputQuery');
      localStorage.removeItem('isShort');
      history.push('/');
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="profile">
        <h1 className="profile__header">Привет, {name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__label profile__label-divider">
            Имя
            <input onChange={handleNameChange} className="profile__input"
                   disabled={isDisabled}
                   value={nameValue} name="name" required={true}/>
            <span className="profile__input-error-message">{errors.name || ' '}</span>
          </label>
          <label className="profile__label">
            Email
            <input onChange={handleEmailChange} className="profile__input" disabled={isDisabled}
                   value={emailValue} name="email" required={true}/>
            <span
              className="profile__input-error-message profile__input-error-message_type_email">{errors.email || ' '}</span>
          </label>

          <button type={isEdit ? 'button' : 'submit'}
                  className={`profile__button profile__button_type_edit ${isEdit && 'profile__button_type_primary'}`}
                  onClick={edit} disabled={disabledButton}>Редактировать
          </button>
          <span
            className={`button__error ${formError && 'button__error_type_visible'}`}>{errorMessage}</span>
          <button type="button"
                  className={`profile__button profile__button_type_warning ${isEdit && 'profile__button_type_hidden'}`}
                  onClick={handleSignout}>Выйти
            из аккаунта
          </button>
          <span
            className={`profile__message ${isSuccess && 'profile__message_type_visible'}`}>Успех!</span>
        </form>
      </main>
    </>
  );
}

export default Profile;
