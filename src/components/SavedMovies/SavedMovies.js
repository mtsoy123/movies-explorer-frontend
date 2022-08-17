import React, {useEffect, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './SavedMovies.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import {getDuration} from '../../utils/getDuration';

function SavedMovies({menuOpened, setMenuOpened, loggedIn}) {
  // const [savedMovies, setSavedMovies] = useState([1]);

  const [movies, setMovies] = useState([]);

  const localStorageMovies = localStorage.getItem('moviesArr');

  useEffect(() => {
    if (localStorageMovies) {
      setMovies(localStorage.getItem('moviesArr'));
    } else {
      setMovies([])
    }

  }, [])

  const handleDeleteCard = () => {

  }

  function renderMovies() {

    return (JSON.parse(localStorageMovies)).map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton="delete"
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        /*todo ниже должен быть кол к апи?*/
        isLiked={false}
        handleCardAction={handleDeleteCard}
        cardProps={movie}
      />
    ))
  }

  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="saved-movies">
        <SearchForm/>
        <MoviesCardList
          movies={movies}
          renderMovies={renderMovies}
          handleAddMoreClick={() => {
          }}
          showMoreVisibility={false}
          showMovies={movies.length}
        />
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
