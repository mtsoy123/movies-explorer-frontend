import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import userContext from '../../context/userContext';

function Movies({menuOpened, setMenuOpened, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [showMovieCardList, setShowMovieCardList] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');

  const {currentUser, setCurrentUser} = useContext(userContext)

  // const isInitialMount = useRef(true);

  function handleCardLike(movieProps) {

    mainApi.getMovies()
    .then((myMovies) => {

      console.log(myMovies)

      if (myMovies.length === 0) {
        mainApi.likeMovie(movieProps)
        .then((newMovie) => {
          setMovies((state) => state.map((m) => {
            return m.id === movieProps.id ? newMovie : m
          }))
        })
        .then(() => {
          // localStorage.setItem('moviesArr', JSON.stringify(movies))
        })
        return
      }
// isLiked если в массиве фильмов myMovies есть фильм movieProps
      const isLiked = myMovies.some(m => m.id === movieProps.id)

      mainApi.changeCardStatus(movieProps, isLiked)
      .then((newMovie) => {
        setMovies((state) => state.map((m) => {
          console.log('newMovie', newMovie)
          console.log('m', m)
          // надо удалить из локальных фильмов поле owner
          // фильм в локасторадже отличается от приходящего
          return m.id === movieProps.id ? newMovie : m
        }))
      })
      .then(() => {
        // localStorage.setItem('moviesArr', JSON.stringify(movies));
      })
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setShowMovieCardList(false);

    setIsLoading(true)
    if (!movieQuery) {
      setIsLoading(false);
      return setErrorMessage('Нужно ввести ключевое слово');
    }
    movieApi.getMovies()
    .then((moviesArr) => {
      setShowMovieCardList(true);
      localStorage.setItem('moviesArr', JSON.stringify(moviesArr));
      localStorage.setItem('inputQuery', event.target.inputQuery.value);
      localStorage.setItem('isShort', isShort);
      setMovies(moviesArr);
    })
    .then(() => {
      setIsLoading(false)
    })
    .catch(() => setErrorMessage('Во время запроса произошла ошибка.\nВозможно, проблема с соединением или сервер недоступен.\nПодождите немного и попробуйте ещё раз'))
  }

  useEffect(() => {
    if (localStorage.getItem('moviesArr')) {
      setMovies(JSON.parse(localStorage.getItem('moviesArr')));
      // setMovieQuery(localStorage.getItem('inputQuery'));
      setIsShort(localStorage.getItem('isShort'));
      setShowMovieCardList(true);
    }
  }, [])

  const isDesktop = useMediaQuery('(min-width: 769px)'); // movie
  const isTablet = useMediaQuery('(max-width: 768px)'); // movie
  const [showMovies, setShowMovies] = useState(0); // movie
  const [showMoreVisibility, setShowMoreVisibility] = useState(true); // movie

  let localStorageMovies = localStorage.getItem('moviesArr');

  useEffect(() => {
    localStorageMovies = localStorage.getItem('moviesArr');
  }, [movies])

  // movie
  useEffect(() => {
    setShowMovies((isDesktop ? 12 : (isTablet ? 8 : 5)))
  }, [isDesktop])


  const handleAddMoreClick = () => {
    setShowMovies(showMovies + (isDesktop ? 3 : 2))
  }

  function renderMovies(moviesArray, moviesCount) {
    if (moviesCount >= moviesArray.length && showMoreVisibility === true) {
      setShowMoreVisibility(false)
      setShowMovies(moviesArray.length)
    }
    // console.log(moviesArray)
    // console.log(JSON.parse(localStorageMovies))

    return (JSON.parse(localStorageMovies) || moviesArray).slice(0, moviesCount).map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton="like"
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        /*todo ниже должен быть кол к апи?*/
        // isLiked={isLiked}
        handleCardAction={handleCardLike}
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
      <main className="movies">
        <SearchForm
          handleSubmit={handleSubmit}
          setIsShort={setIsShort}
          setMovieQuery={setMovieQuery}
          movieQuery={movieQuery}
        />
        {isLoading && <Preloader
          isLoading={isLoading}
        />}
        {/*todo add adaptive styles*/}
        {errorMessage && (<MovieListError
          errorText={errorMessage}
        />)}

        {showMovieCardList && (<MoviesCardList
          movies={movies}
          handleCardAction={handleCardLike}
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
