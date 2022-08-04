import React from 'react';
import './LandingTitle.css'

function LandingTitle({children}) {
  return (
    <h2 className='landing-title'>
      {children}
    </h2>
  );
}

export default LandingTitle;
