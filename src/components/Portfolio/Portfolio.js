import React from 'react';
import './Portfolio.css'

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__caption'>Портфолио</h3>
      <ul className='portfolio__link-container'>
        <li className='portfolio__link'>
          <a href='https://how-to-learn-red.vercel.app' className='portfolio__text-link'>Статичный сайт <p className='portfolio__icon-link'>&#8599;</p> </a>
        </li>
        <li className='portfolio__link'>
          <a href='https://russian-travel-one.vercel.app' className='portfolio__text-link'>Адаптивный сайт <p className='portfolio__icon-link'>&#8599;</p></a>
        </li>
        <li className='portfolio__link'>
          <a href='https://mtsoy.numberone.nomoredomains.sbs' className='portfolio__text-link'>Одностраничное приложение <p className='portfolio__icon-link'>&#8599;</p></a>
        </li>
      </ul>

    </section>
  );
}

export default Portfolio;
