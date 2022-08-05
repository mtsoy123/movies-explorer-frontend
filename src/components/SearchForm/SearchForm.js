import React from 'react';
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <section className='search-form'>
      <div className='search-form__input-container'>
        <input className='search-form__input' type='text' placeholder='Фильм'/>
        <input className='search-form__button' type='submit' value='Поиск'/>
      </div>
      <FilterCheckbox/>
    </section>
  );
}

export default SearchForm;
