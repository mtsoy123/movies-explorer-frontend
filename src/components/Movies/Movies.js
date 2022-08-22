import React, {useEffect, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css'
import {movieApi} from '../../utils/MoviesApi';
import {mainApi} from '../../utils/MainApi';
import MovieListError from '../MovieListError/MovieListError';
import useMediaQuery from '../../hooks/useMediaQuery';
import MoviesCard from '../MoviesCard/MoviesCard';
import {getDuration} from '../../utils/getDuration';
import {filterQuery} from '../../utils/filter';

function Movies({menuOpened, setMenuOpened, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [showMovieCardList, setShowMovieCardList] = useState(false);
  const [showMovies, setShowMovies] = useState(0);
  const [showMoreVisibility, setShowMoreVisibility] = useState(true);
  const [movies, setMovies] = useState([])
  const [isShort, setIsShort] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const [localStorageQuery, setLocalStorageQuery] = useState(localStorage.getItem('inputQuery'));
  const [localStorageIsShort, setLocalStorageIsShort] = useState(JSON.parse(localStorage.getItem('isShort')));
  const [localStorageMovies, setLocalStorageMovies] = useState(JSON.parse(localStorage.getItem('moviesArr')));

  const isDesktop = useMediaQuery('(min-width: 769px)');
  const isTablet = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (localStorage.getItem('moviesArr')) {
      setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
    }
  }, [movies])

  useEffect(() => {
    defaultShowMovies();
  }, [isDesktop])

  useEffect(() => {
    if (localStorageMovies) {
      setShowMovieCardList(!showMovieCardList)
    }
  }, [])

  useEffect(() => {
    if (localStorageMovies) {
      setMovies(localStorageMovies)
    }
  }, [])

  useEffect(() => {
    if (localStorageIsShort) {
      setIsShort(localStorageIsShort)
    }
  }, [])

  useEffect(() => {
    if (localStorageQuery) {
      setMovieQuery(localStorageQuery)
    }
  }, [])

  const defaultShowMovies = () => setShowMovies((isDesktop ? 12 : (isTablet ? 8 : 5)));

  function handleCardLike(movieProps) {

    mainApi.getMovies()
    .then(res => {
      return res.filter(m => m.movieId === movieProps.id);
    })
    .then(likedMovie => {
      return mainApi.changeCardStatus(movieProps, likedMovie)
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
        setMovies(newMovieArray);
        return newMovieArray;
      })
      .then((res) => {
        return localStorage.setItem('moviesArr', JSON.stringify(res))
      })
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

    if (!localStorageMovies) {
      movieApi.getMovies()
      .then((moviesArr) => {
        setShowMovieCardList(true);
        localStorage.setItem('moviesArr', JSON.stringify(moviesArr));
        localStorage.setItem('inputQuery', movieQuery);
        localStorage.setItem('isShort', JSON.stringify(isShort));
        setMovies(JSON.parse(localStorage.getItem('moviesArr')));
        setLocalStorageQuery(localStorage.getItem('inputQuery'));
        setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
        setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => setErrorMessage('Во время запроса произошла ошибка.\nВозможно, проблема с соединением или сервер недоступен.\nПодождите немного и попробуйте ещё раз'))
    } else {
      localStorage.setItem('inputQuery', movieQuery);
      localStorage.setItem('isShort', JSON.stringify(isShort));
      setLocalStorageQuery(localStorage.getItem('inputQuery'));
      setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
      setIsLoading(false)
      setShowMovieCardList(true);
    }
  }

  const handleAddMoreClick = () => {
    setShowMovies(showMovies + (isDesktop ? 3 : 2))
  }

  function renderMovies(moviesCount) {
    const filteredArray = filterQuery(localStorageMovies, localStorageQuery, localStorageIsShort);

    if (filteredArray.length === 0) {
      return setErrorMessage('Ничего не найдено');
    }

    if (moviesCount <= filteredArray) {
      setShowMoreVisibility(true)
    }

    if (moviesCount >= filteredArray.length && showMoreVisibility === true) {
      setShowMoreVisibility(false)
      setShowMovies(filteredArray.length)
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
