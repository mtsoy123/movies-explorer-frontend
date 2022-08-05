import React from 'react';
import './AboutProject.css'
import LandingHeading from '../LandingHeading/LandingHeading';

function AboutProject() {
  return (
    <section className="about-project">
      <LandingHeading section="about-project">
        О проекте
      </LandingHeading>
      <section className="about-project__grid">

        <h3 className="about-project__subheading about-project__subheading_type_stages">
          Дипломный проект включал 5 этапов
        </h3>
        <h3 className="about-project__subheading about-project__subheading_type_duration">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__body about-project__body_type_stages">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
          доработки.
        </p>
        <p className="about-project__body about-project__body_type_duration">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
          защититься.
        </p>

      </section>
      <div className="about-project__weeks-container">
        <p className="about-project__weeks about-project__infograph_s">1 неделя</p>
        <p className="about-project__weeks about-project__infograph_l">4 недели</p>
        <p className="about-project__caption">Back-end</p>
        <p className="about-project__caption">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
