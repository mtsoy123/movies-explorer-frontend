import React from 'react';
import './Footer.css'

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
        <ul className="footer__links-container">
          <li className="footer__link">
            <a target="_blank" rel="noopener noreferrer" href="https://practicum.yandex.ru"
               className="footer__link-text">Яндекс.Практикум</a>
          </li>
          <li className="footer__link">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/mtsoy123"
               className="footer__link-text">Github</a>
          </li>
          <li className="footer__link">
            <a target="_blank" rel="noopener noreferrer"
               href="https://www.linkedin.com/in/mikhail-tsoy/"
               className="footer__link-text">Linkedin</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
