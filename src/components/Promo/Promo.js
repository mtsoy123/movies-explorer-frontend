import React from 'react';
import './Promo.css'
import promo__image from '../../images/promo__image.svg'

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__image" src={promo__image} alt="Изображение на лендинге"/>
      </div>
    </section>
  );
}

export default Promo;
