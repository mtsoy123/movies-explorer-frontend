import React, {useState} from 'react';
import './MoviesCard.css'

function MoviesCard({
                      cardButton,
                      imgSrc,
                      movieDuration,
                      movieTitle,
                      handleCardAction,
                      cardProps,
                      trailerLink
                    }) {
  const liked = cardProps.liked;
  const cardLikeButtonClassName = (
    `${liked && 'movie-card__button_type_active'}`
  );

  function onClick() {
    handleCardAction(cardProps)
  }

  function openTrailer() {
    const newWindow = window.open(trailerLink, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <li className="movie-card">
      <img className="movie-card__thumbnail" onClick={() => openTrailer()} src={imgSrc}
           alt={movieTitle}/>
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
