import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './SavedMovies.css'

function SavedMovies({menuOpened, setMenuOpened, loggedIn}) {
  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="saved-movies">
        <SearchForm/>
        <MoviesCardList cardButton="delete"/>
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
