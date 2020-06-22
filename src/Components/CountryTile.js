import React from 'react';
import { Link } from 'react-router-dom';

function CountryTile({country}){
  return (
    <Link className='countryTile' to={`/${country.alpha3Code}`}>
      <img className='countryFlag' alt={country.name} src={`${country.flag}`}/>
      <h3 className='countryTitle'>{country.name}</h3>
    </Link>
  );
} 

export default CountryTile;