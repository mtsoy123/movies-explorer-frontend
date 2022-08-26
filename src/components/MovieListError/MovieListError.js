import React from 'react';
import './MovieListError.css'

function MovieListError({errorText}) {
  return (
    <section className="movie-card-list">
      <p className="movie-list-error__text">{errorText}</p>
    </section>
  );
}

export default MovieListError;
