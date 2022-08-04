import React from 'react';
import LandingHeading from '../LandingHeading/LandingHeading';
import './Techs.css'

function Techs(props) {
  return (
    <section className="techs">
      <div className='techs__container'>
        <LandingHeading section='techs'>
          Технологии
        </LandingHeading>
        <h3 className='techs__title'>
          7 технологий
        </h3>
        <p className='techs__body'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__tech-container'>
          <li className='techs__tech'>
            HTML
          </li>
          <li className='techs__tech'>
            CSS
          </li>
          <li className='techs__tech'>
            JS
          </li>
          <li className='techs__tech'>
            React
          </li>
          <li className='techs__tech'>
            Git
          </li>
          <li className='techs__tech'>
            Express.js
          </li>
          <li className='techs__tech'>
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
