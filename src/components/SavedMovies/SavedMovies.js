import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function SavedMovies({menuOpened, setMenuOpened, loggedIn}) {
  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <SearchForm/>
      <MoviesCardList cardButton="delete"/>
      <Footer/>
    </>
  );
}

export default SavedMovies;
