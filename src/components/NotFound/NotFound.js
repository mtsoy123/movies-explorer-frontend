import React from 'react';
import './NotFound.css'
import {useHistory} from 'react-router-dom';

function NotFound(props) {
  const history = useHistory();
  console.log(history)

  return (
    <main className="not-found">
      <section className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__body">Страница не найдена</p>
      </section>
      <button onClick={history.goBack} className="not-found__link">Назад</button>
    </main>
  );
}

export default NotFound;
