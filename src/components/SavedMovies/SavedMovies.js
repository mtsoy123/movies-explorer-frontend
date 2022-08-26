import React, {useEffect, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './SavedMovies.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import {getDuration} from '../../utils/getDuration';
import {mainApi} from '../../utils/MainApi';
import {filterQuery} from '../../utils/filter';
import MovieListError from '../MovieListError/MovieListError';

function SavedMovies({
                       menuOpened, setMenuOpened, loggedIn, savedMoviesIsShort,
                       setSavedMoviesIsShort,
                       savedMoviesQuery,
                       setSavedMoviesQuery,
                       likedMovies,
                       setLikedMovies,
                       localStorageMovies,
                       setLocalStorageMovies,
                     }) {
  const [movies, setMovies] = useState([]);
  const [showMovieCardList, setShowMovieCardList] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (localStorageMovies) {
      setLikedMovies(localStorageMovies.filter(item => {
        return item.liked
      }))
    }
  }, [localStorageMovies])

  useEffect(() => {
    if (likedMovies) {
      setShowMovieCardList(true);
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowMovieCardList(false);
    setErrorMessage('')
    if (!savedMoviesQuery) {
      return setErrorMessage('Нужно ввести ключевое слово');
    }
    if (likedMovies.length === 0) {
      return setErrorMessage('Ничего не найдено');
    }
    setShowMovieCardList(true);
  }

  function handleDeleteMovie(movieProps) {

    const likedMovie = localStorageMovies.filter(movie => {
      return movie.id === movieProps.id
    })

    mainApi.deleteMovie(likedMovie[0]._id)
    .then((editedMovie) => {
      const getNewMovieArray = (moviesArray) => {
        return moviesArray.map((m) => {
          if (m.id === editedMovie.movieId) {
            m.liked = !m.liked
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
    .then(() => {
      renderMovies();
    })
    .catch(err => console.log(err))
  }

  function renderMovies() {
    const filteredArray = filterQuery(likedMovies, savedMoviesQuery, savedMoviesIsShort);

    return filteredArray.map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton="delete"
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        handleCardAction={handleDeleteMovie}
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
      <SearchForm
        handleSubmit={handleSubmit}
        setIsShort={setSavedMoviesIsShort}
        setMovieQuery={setSavedMoviesQuery}
        movieQuery={savedMoviesQuery}
        isShort={savedMoviesIsShort}
      />
      {errorMessage && (<MovieListError
        errorText={errorMessage}
      />)}
      {showMovieCardList && <main className="saved-movies">
        <MoviesCardList
          renderMovies={renderMovies}
          handleAddMoreClick={() => {
          }}
          showMoreVisibility={false}
          showMovies={likedMovies.length}
        />
      </main>}
      <Footer/>
    </>
  );
}

export default SavedMovies;
