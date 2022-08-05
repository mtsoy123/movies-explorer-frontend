import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox(props) {
  return (
    <div className='filter'>
      <input className='filter__checkbox' type="checkbox" id='switch'/>
      <label className='filter__checkbox-switch' htmlFor="switch">Toggle</label>
      <p className='filter__label'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
