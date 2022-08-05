import React from 'react';
import './AboutMe.css'
import LandingHeading from '../LandingHeading/LandingHeading';
import photo from '../../images/about-me__photo.png'

function AboutMe(props) {
  return (
    <section className="about-me">
      <LandingHeading section="about-me">Студент</LandingHeading>
      <div className="about-me__container">
        <h2 className="about-me__title">Михаил</h2>
        <p className="about-me__subtitle">Фронтенд-разработчик, 26 лет</p>
        <p className="about-me__body">Я родился и вырос в Санкт-Петербурге. Окончил Петербургский
          университет телекоммуникаций. Начал путь в айти дизайнером интерфейсов. Сейчас глаза
          горят разработкой. В свободное время я mindfulness samurai. Медитирую и практикую
          осознанность.</p>
        <img className="about-me__photo" src={photo} alt="Фото"/>
        <div className="about-me__social-link-container">
          {/*Нет facebook, указал linkedin*/}
          <a href="https://www.linkedin.com/in/mikhail-tsoy/"
             className="about-me__social-link">Linkedin</a>
          <a href="https://github.com/mtsoy123" className="about-me__social-link">Github</a>
        </div>
      </div>

    </section>
  );
}

export default AboutMe;
