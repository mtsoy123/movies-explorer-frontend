import React, {useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './SavedMovies.css'

function SavedMovies({menuOpened, setMenuOpened, loggedIn}) {
  const [savedMovies, setSavedMovies] = useState([1]);

  return (
    <>
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        loggedIn={loggedIn}/>
      <main className="saved-movies">
        <SearchForm/>
        <MoviesCardList
          cardButton="delete"
          movies={savedMovies}
        />
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
