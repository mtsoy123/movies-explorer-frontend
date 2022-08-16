import React, {useEffect, useRef, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css'
import {movieApi} from '../../utils/MoviesApi';
import {mainApi} from '../../utils/MainApi';
import MovieListError from '../MovieListError/MovieListError';

function Movies({menuOpened, setMenuOpened, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [showMovieCardList, setShowMovieCardList] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  // const isInitialMount = useRef(true);
  const [isLiked, setIsLiked] = useState(false);

  function handleCardLike(movieProps) {
    /*
    * Получить массив фильмов с мейнапи
    * Найти в массиве фильм, который хотим лайкнуть
    * Если есть, то удалить фильм
    * Если нет, то лайкнуть фильм
    * */
    mainApi.getMovies()
    .then((myMovies) => {
      return myMovies.id.some(i => i === movieProps.id)
    })
    .then((movie) => {
      // получаем фильм, соответствующий айди
      // если фильм не пришел — лайк
      // если фильм пришел — дизлайк
      // todo вернуться и протестировать
      console.log(movie)

      if (!movie) {
        mainApi.likeMovie(movieProps)

        return
      }

      return mainApi.deleteMovie(movie.id)

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
      setMovieQuery(localStorage.getItem('inputQuery'));
      setIsShort(localStorage.getItem('isShort'));
      setShowMovieCardList(true);
    }
  }, [])


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
          cardButton="like"
          movies={movies}
          handleCardLike={handleCardLike}
          isLiked={isLiked}
        />)

        }
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
