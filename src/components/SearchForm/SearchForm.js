import React from 'react';
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({handleSubmit, setIsShort, setMovieQuery, movieQuery, isShort}) {
  function handleChange(event) {
    setMovieQuery(event.target.value);
  }

  return (
    <section className="search-form">
      <form noValidate={true} onSubmit={handleSubmit} className="search-form__input-container">
        <input name="inputQuery" required={true} className="search-form__input" type="text"
               placeholder="Фильм" onChange={handleChange} value={movieQuery}/>
        <button className="search-form__button" type="submit">Поиск</button>
      </form>
      <FilterCheckbox
        setIsShort={setIsShort}
        isShort={isShort}
      />
    </section>
  );
}

export default SearchForm;
