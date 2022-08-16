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
  const {values, nameValidation, emailValidation} = useFormWithValidation();
  const [isSuccess, setIsSuccess] = useState(false);

  function edit() {
    setIsEdit(!isEdit);
    setIsDisabled(!isDisabled);
  }

  const {currentUser, setCurrentUser} = useContext(userContext);
  const history = useHistory();
  console.log(currentUser)
  const {name, email} = currentUser;

  useEffect(() => {
    values.name = name;
    values.email = email;
    console.log(values.name)
    console.log(values.email)
  }, [currentUser])

  const handleSubmit = (event) => {
    event.preventDefault();
    mainApi.updateProfile(values.email, values.name)
    .then(res => {
      setCurrentUser(res)
      setIsSuccess(true);
    })
    .catch(err => console.log(err))
  }

  function handleSignout() {
    mainApi.signOut()
    .then(() => {
      localStorage.removeItem('token');
      setLoggedIn(false);
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
            <input onChange={nameValidation} className="profile__input" disabled={isDisabled}
                   value={values.name || name} name="name" required={true}/>
          </label>
          <label className="profile__label">
            Email
            <input onChange={emailValidation} className="profile__input" disabled={isDisabled}
                   value={values.email || email} name="email" required={true}/>
          </label>

          <button type={isEdit ? 'button' : 'submit'}
                  className={`profile__button profile__button_type_edit ${isEdit && 'profile__button_type_primary'}`}
                  onClick={edit}>Редактировать
          </button>

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
