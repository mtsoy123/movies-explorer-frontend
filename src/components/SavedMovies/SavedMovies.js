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

function SavedMovies({menuOpened, setMenuOpened, loggedIn}) {
  const [movies, setMovies] = useState([]);
  const [showMovieCardList, setShowMovieCardList] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [isShort, setIsShort] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const [localStorageQuery, setLocalStorageQuery] = useState(localStorage.getItem('inputQuery'));
  const [localStorageIsShort, setLocalStorageIsShort] = useState(JSON.parse(localStorage.getItem('isShort')));
  const [localStorageMovies, setLocalStorageMovies] = useState(JSON.parse(localStorage.getItem('moviesArr')));
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    if (localStorageMovies) {
      setMovies(localStorageMovies);
    } else {
      setMovies([])
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('moviesArr')) {
      setLocalStorageMovies(JSON.parse(localStorage.getItem('moviesArr')));
      setLikedMovies(localStorageMovies.filter(item => {
        return item.liked
      }))
    }
  }, [movies])

  useEffect(() => {
    if (likedMovies) {
      setShowMovieCardList(!showMovieCardList)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!movieQuery) {
      return setErrorMessage('Нужно ввести ключевое слово');
    }
    if (likedMovies.length === 0) {
      return setErrorMessage('Ничего не найдено');
    }
    localStorage.setItem('inputQuery', movieQuery);
    localStorage.setItem('isShort', JSON.stringify(isShort));
    setLocalStorageQuery(localStorage.getItem('inputQuery'));
    setLocalStorageIsShort(JSON.parse(localStorage.getItem('isShort')));
    setShowMovieCardList(true);
  }

  function handleDeleteMovie(movieProps) {
    mainApi.deleteMovie(movieProps._id)
    .then(deletedMovie => {
      const getNewMovieArray = (moviesArray) => {
        return moviesArray.map((m) => {
          if (m.id === deletedMovie.movieId) {
            m.liked = !m.liked
            return m
          } else {
            return m
          }
        })
      }
      const newMovieArray = getNewMovieArray(localStorageMovies);
      setMovies(newMovieArray);
      return newMovieArray
    })
    .then((res) => {
      return localStorage.setItem('moviesArr', JSON.stringify(res))
    })
    .then(() => {
      setShowMovieCardList(true);
      renderMovies();
    })
    .catch(err => console.log(err))
  }

  function renderMovies() {
    const filteredArray = filterQuery(likedMovies, localStorageQuery, localStorageIsShort);

    return filteredArray.map((movie) => (
      <MoviesCard
        key={movie.id}
        cardButton="delete"
        movieTitle={movie.nameRU}
        movieDuration={getDuration(movie.duration)}
        imgSrc={`https://api.nomoreparties.co/${movie.image.url}`}
        handleCardAction={handleDeleteMovie}
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
      <SearchForm
        handleSubmit={handleSubmit}
        setIsShort={setIsShort}
        setMovieQuery={setMovieQuery}
        movieQuery={movieQuery}
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
