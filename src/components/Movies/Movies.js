import React, {useEffect, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css'
import {mainApi} from '../../utils/MainApi';
import MovieListError from '../MovieListError/MovieListError';
import useMediaQuery from '../../hooks/useMediaQuery';
import MoviesCard from '../MoviesCard/MoviesCard';
import {getDuration} from '../../utils/getDuration';
import {filterQuery} from '../../utils/filter';
import {
  DESKTOP_ADD_MORE_COUNT,
  DESKTOP_MOVIES_COUNT,
  MOBILE_ADD_MORE_COUNT,
  MOBILE_MOVIES_COUNT,
  TABLET_MOVIES_COUNT
} from '../../utils/Constant';

function Movies({
                  menuOpened,
                  setMenuOpened,
                  loggedIn,
                  isShort,
                  setIsShort,
                  movieQuery,
                  setMovieQuery,
                  localStorageQuery,
                  setLocalStorageQuery,
                  localStorageIsShort,
                  setLocalStorageIsShort,
                  localStorageMovies,
                  setLocalStorageMovies
                }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [showMovieCardList, setShowMovieCardList] = useState(false);
  const [showMovies, setShowMovies] = useState(0);
  const [showMoreVisibility, setShowMoreVisibility] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const isTablet = useMediaQuery('(min-width: 320px)');

  useEffect(() => {
    defaultShowMovies();
  }, [isDesktop])

  useEffect(() => {
    if (localStorageMovies) {
      setShowMovieCardList(!showMovieCardList)
    }
  }, [])

  useEffect(() => {
    if (localStorageIsShort) {
      setIsShort(localStorageIsShort)
    }
  }, [])

  useEffect(() => {
    setShowMoreVisibility(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('isShort', JSON.stringify(isShort));
    setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
    defaultShowMovies();
  }, [isShort])

  useEffect(() => {
    if (localStorageQuery) {
      setMovieQuery(localStorageQuery)
    }
  }, [])

  useEffect(() => {
    if (isShort) {
      defaultShowMovies()
    }
  }, [isShort])

  useEffect(() => {
    setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
  }, [])

  const defaultShowMovies = () => setShowMovies((isDesktop ? DESKTOP_MOVIES_COUNT : (isTablet ? TABLET_MOVIES_COUNT : MOBILE_MOVIES_COUNT)));

  function handleCardLike(movieProps) {
    const likedMovie = localStorageMovies.filter(movie => {
      return movie.movieId === movieProps.id
    })

    mainApi.changeCardStatus(movieProps, likedMovie)
    .then((editedMovie) => {
      const getNewMovieArray = (moviesArray) => {
        return moviesArray.map((m) => {
          if (m.id === editedMovie.movieId) {
            m.liked = !m.liked
            m._id = editedMovie._id
            return m
          } else {
            return m
          }
        })
      }
      const newMovieArray = getNewMovieArray(localStorageMovies);
      return newMovieArray;
    })
    .then((res) => {
      localStorage.setItem('moviesArr', JSON.stringify(res))
      setLocalStorageMovies(res)
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    defaultShowMovies();
    setErrorMessage('');
    setShowMovieCardList(false);
    setIsLoading(true)

    if (!movieQuery) {
      setIsLoading(false);
      return setErrorMessage('Нужно ввести ключевое слово');
    }
    localStorage.setItem('inputQuery', movieQuery);
    localStorage.setItem('isShort', JSON.stringify(isShort));
    setLocalStorageQuery(localStorage.getItem('inputQuery'));
    setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
    setIsLoading(false)
    setShowMovieCardList(true);
  }

  const handleAddMoreClick = () => {
    setShowMovies(showMovies + (isDesktop ? DESKTOP_ADD_MORE_COUNT : MOBILE_ADD_MORE_COUNT))
  }

  function renderMovies(moviesCount) {
    if (!localStorageQuery) {
      setShowMoreVisibility(false);
      return
    }

    const filteredArray = filterQuery(localStorageMovies, localStorageQuery, localStorageIsShort);

    if (filteredArray.length === 0) {
      return setErrorMessage('Ничего не найдено');
    }

    if (moviesCount < filteredArray.length) {
      setShowMoreVisibility(true);
    }

    if (moviesCount >= filteredArray.length && showMoreVisibility === true) {
      setShowMoreVisibility(false);
      setShowMovies(filteredArray.length);
    }

    return filteredArray.slice(0, moviesCount).map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton="like"
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        handleCardAction={handleCardLike}
        cardProps={movie}
        trailerLink={movie.trailerLink}
      />
    ))
  }

  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="movies">
        <SearchForm
          handleSubmit={handleSubmit}
          setIsShort={setIsShort}
          setMovieQuery={setMovieQuery}
          movieQuery={movieQuery}
          isShort={isShort}
        />
        {isLoading && <Preloader
          isLoading={isLoading}
        />}
        {errorMessage && (<MovieListError
          errorText={errorMessage}
        />)}

        {showMovieCardList && (<MoviesCardList
          showMovies={showMovies}
          renderMovies={renderMovies}
        >
          <section
            className={`movie-card-list__add-more ${showMoreVisibility && 'movie-card-list__add-more_type_visible '}`}>
            <button onClick={handleAddMoreClick} type="button"
                    className="movie-card-list__add-more-button">Ещё
            </button>
          </section>
        </MoviesCardList>)
        }
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
