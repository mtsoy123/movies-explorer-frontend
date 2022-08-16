import React from 'react';
import './MoviesCard.css'

function MoviesCard({
                      cardButton,
                      isLiked,
                      imgSrc,
                      movieDuration,
                      movieTitle,
                      handleCardLike,
                      cardProps
                    }) {
  const cardLikeButtonClassName = (
    `${isLiked && 'movie-card__button_type_active'}`
  );

  function onClick() {
    handleCardLike(cardProps)

    // todo check following
    // setIsLiked(true)
  }

  return (
    <li className="movie-card">
      <img className="movie-card__thumbnail" src={imgSrc} alt={movieTitle}/>
      <div className="movie-card__container">
        <h2 className="movie-card__title">{movieTitle}</h2>
        <button type="button"
                className={`movie-card__button movie-card__button_type_${cardButton} ${cardLikeButtonClassName}`}
                onClick={onClick}></button>
        <p className="movie-card__caption">{movieDuration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
