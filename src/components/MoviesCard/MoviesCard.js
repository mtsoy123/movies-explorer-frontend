import React from 'react';
import './MoviesCard.css'
import test__pic from '../../images/test__pic.png'

function MoviesCard({cardButton, isLiked}) {
  const cardLikeButtonClassName = (
    `${isLiked && 'movie-card__button_type_active'}`
  );

  return (
    <li className='movie-card'>
      <img className='movie-card__thumbnail' src={test__pic} alt={test__pic}/>
      <div className='movie-card__container'>
        <h2 className='movie-card__title'>33 слова о дизайне</h2>
        <button className={`movie-card__button movie-card__button_type_${cardButton} ${cardLikeButtonClassName}`}></button>
        <p className='movie-card__caption'>1ч 47м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
