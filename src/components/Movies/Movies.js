import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Movies({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Preloader/>
      <SearchForm/>
      <MoviesCardList cardButton='like'/>
      <Footer/>
    </>
  );
}

export default Movies;
