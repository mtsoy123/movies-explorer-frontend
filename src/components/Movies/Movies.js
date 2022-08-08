import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css'

function Movies({menuOpened, setMenuOpened, loggedIn}) {
  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="movies">
        <Preloader/>
        <SearchForm/>
        <MoviesCardList cardButton="like"/>
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
