import React from 'react';
import './LandingHeading.css'

function LandingHeading({section, children}) {
  return (
    <h2 className={`landing-heading landing-heading_type_${section}`}>{children}</h2>
  );
}

export default LandingHeading;
