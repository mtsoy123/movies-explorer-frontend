import React, {useState} from 'react';
import './Header.css'
import logo from '../../images/logo.svg'
import {Link, NavLink} from 'react-router-dom';

function Header({loggedIn}) {
  const [menuOpened, setMenuOpened] = useState(false);

  function openMenu() {
    setMenuOpened(!menuOpened)
  }

  return (
    <header className={`header ${menuOpened && 'header__overlay'}`}>
      <nav className="header__navigation">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo"/>
        </Link>
        {loggedIn
          ?
          <>
            <button onClick={openMenu}
                    className="header__button header__navigation-container__type_menu-button"/>
            <ul
              className={`header__navigation-container ${menuOpened && 'header__navigation-container_opened'}`}>
              <li className="header__navigation-folded header__navigation-list">
                <NavLink exact to="/" activeClassName="header__navigation-link_type_active"
                         className="header__navigation-link ">Главная</NavLink>
              </li>
              <li className=" header__navigation-list">
                <NavLink to="/movies" activeClassName="header__navigation-link_type_active"
                         className="header__navigation-link">Фильмы</NavLink>
              </li>
              <li className=" header__navigation-list">
                <NavLink to="/saved-movies" activeClassName="header__navigation-link_type_active"
                         className="header__navigation-link">Сохраненные фильмы</NavLink>
              </li>
              <li className="header__navigation-list  header__navigation_type_account">
                <NavLink to="/profile"
                         className="header__button header__button_type_account">Аккаунт</NavLink>
              </li>
            </ul>
            {menuOpened &&
              <button className="header__button  header__button_type_close"/>}
          </>
          :
          <div className="header__button-container">
            <NavLink to="/signup"
                     className="header__button header__button_type_secondary">Регистрация</NavLink>
            <NavLink to="/signin"
                     className="header__button header__button_type_primary">Войти</NavLink>
          </div>

        }
      </nav>

    </header>
  );
}

export default Header;
