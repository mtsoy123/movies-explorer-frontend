import React, {useState} from 'react';
import './Profile.css'
import Header from '../Header/Header';

function Profile({userName, userEmail, loggedIn}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(false)
console.log(loggedIn)
  function edit() {
    setIsEdit(!isEdit);
    setIsDisabled(!isDisabled);
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className='profile'>
        <h1 className='profile__header'>Привет, {userName}!</h1>
        <form className='profile__form'>
          <label className='profile__label profile__label-divider'>
            Имя
            <input className='profile__input' disabled={isDisabled} value={userName}/>
            </label>
          <label className='profile__label'>
            Email
            <input className='profile__input' disabled={isDisabled} value={userEmail}/>
          </label>
        </form>
        <button className={`profile__button ${isEdit && 'profile__button_type_primary'}`} onClick={edit}>Редактировать</button>
        <button className={`profile__button profile__button_type_warning ${isEdit && 'profile__button_type_hidden'}`}>Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
