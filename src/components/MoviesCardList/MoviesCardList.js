import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cardButton}) {
  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__grid">
        <MoviesCard cardButton={cardButton}/>
        <MoviesCard cardButton={cardButton}/>
        <MoviesCard cardButton={cardButton}/>
        <MoviesCard cardButton={cardButton}/>
      </ul>
      <section className="movie-card-list__add-more">
        <button className="movie-card-list__add-more-button">Ещё</button>
      </section>
    </section>
  );
}

export default MoviesCardList;
