import React, {useEffect, useState} from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import useMediaQuery from '../../utils/useMediaQuery';

function MoviesCardList({cardButton, movies}) {
  function getDuration(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}ч ${minutes}м`;
  }

  const isDesktop = useMediaQuery('(min-width: 769px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  const [showMovies, setShowMovies] = useState(0);
  const [showMoreVisibility, setShowMoreVisibility] = useState(true);

  useEffect(() => {
    setShowMovies((isDesktop ? 12 : (isTablet ? 8 : 5)))
  }, [isDesktop])

  const localStorageMovies = localStorage.getItem('moviesArr');


  function renderMovies(movies, moviesCount) {

    if (moviesCount >= movies.length && showMoreVisibility === true) {
      console.log(moviesCount)
      setShowMoreVisibility(false)
      setShowMovies(movies.length)
    }

    return (JSON.parse(localStorageMovies) || movies).slice(0, moviesCount).map((movie) => (
      // return (movies).slice(0, moviesCount).map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton={cardButton}
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        /*todo ниже должен быть кол к апи*/
        isLiked={false}
      />
    ))
  }

  const handleClick = () => {
    setShowMovies(showMovies + (isDesktop ? 88 : 2))
  }

  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__grid">
        {renderMovies(movies, showMovies)}
      </ul>
      <section
        className={`movie-card-list__add-more ${showMoreVisibility && 'movie-card-list__add-more_type_visible '}`}>
        <button onClick={handleClick} type="button"
                className="movie-card-list__add-more-button">Ещё
        </button>
      </section>
    </section>
  );
}

export default MoviesCardList;
