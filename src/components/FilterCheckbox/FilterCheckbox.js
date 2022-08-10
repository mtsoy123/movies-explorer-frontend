import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox({setIsShort}) {
  function handleClick() {
    setIsShort(true)
  }

  return (
    <div className="filter">
      <input onClick={handleClick} className="filter__checkbox" type="checkbox" id="switch"/>
      <label className="filter__checkbox-switch" htmlFor="switch" tabIndex="0">Toggle</label>
      <p className="filter__label">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
