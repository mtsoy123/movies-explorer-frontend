import React from 'react';
import './MoviesCardList.css'

function MoviesCardList({
                          showMovies,
                          renderMovies,
                          children
                        }) {
  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__grid">
        {renderMovies(showMovies)}
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
