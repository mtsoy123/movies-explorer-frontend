import React, {useEffect, useState} from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import useMediaQuery from '../../hooks/useMediaQuery';

function MoviesCardList({cardButton, movies, isLiked, handleCardLike}) {


  // movieCardList
  function getDuration(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}ч ${minutes}м`;
  }

  const isDesktop = useMediaQuery('(min-width: 769px)'); // movie
  const isTablet = useMediaQuery('(max-width: 768px)'); // movie
  const [showMovies, setShowMovies] = useState(0); // ??
  const [showMoreVisibility, setShowMoreVisibility] = useState(true); // movie

  // movie
  useEffect(() => {
    setShowMovies((isDesktop ? 12 : (isTablet ? 8 : 5)))
  }, [isDesktop])

  // ??
  const localStorageMovies = localStorage.getItem('moviesArr');


  function renderMovies(moviesArray, moviesCount) {
    if (moviesCount >= moviesArray.length && showMoreVisibility === true) {
      setShowMoreVisibility(false)
      setShowMovies(moviesArray.length)
    }

    return (JSON.parse(localStorageMovies) || moviesArray).slice(0, moviesCount).map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton={cardButton}
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        /*todo ниже должен быть кол к апи*/
        isLiked={isLiked}
        handleCardLike={handleCardLike}
        cardProps={movie}
      />
    ))
  }

  // movies
  const handleAddMoreClick = () => {
    setShowMovies(showMovies + (isDesktop ? 88 : 2))
  }

  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__grid">
        {renderMovies(movies, showMovies)}
      </ul>
      <section
        className={`movie-card-list__add-more ${showMoreVisibility && 'movie-card-list__add-more_type_visible '}`}>
        <button onClick={handleAddMoreClick} type="button"
                className="movie-card-list__add-more-button">Ещё
        </button>
      </section>
    </section>
  );
}

export default MoviesCardList;
