import React from 'react';
import Border from './Borders';
import Currency from './Currency';

function DetailTiles(props){
  const {country} = props;
  const colors = [
    "#e1d276",
    "#99ea86",
    "#83d6b7"
  ];
  return (
    country.name?
    <div className='detailTiles' style={{marginBottom:"50px",marginTop:50}}>
      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
        <h3>Capital</h3>
        <h2>{country.capital}</h2>
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Demonym</h3>
      <h2>{country.demonym}</h2>
      </div>

      <div class='detailTiles'>
        <h3 style={{width:"100%",textAlign:'center',fontSize:24,color:'#eeeeee'}}>Languages</h3>
        {country.languages.map(language=>{
          return (
          <a style={{fontSize:22}} href={`https://translate.google.com/#view=home&op=translate&sl=en&tl=${language.iso639_1}`} key={language.iso639_1} target='blank'>
          <div className='detailTile lg' style={{background:colors[parseInt(Math.random()*3)]}}>{language.name} ({language.nativeName})</div></a>          
          );
        })}
      </div>

      <div className='currencies'>
        <h3 style={{width:"100%",textAlign:'center',fontSize:24,color:'#eeeeee'}}>Currencies:</h3>
        {country.currencies.map(currency=>{
          return <Currency currency={currency} key={currency.code} />
        })}
      </div>

      <div>
        <h3 style={{width:"100%",textAlign:'center',fontSize:24,color:'#eeeeee'}}>Borders:</h3>
        {country.borders.length!==0?
        <Border borders={country.borders} />:
        <h3 className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>This country doesn't share borders with any other country.</h3>}
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Calling Codes</h3>
      <h2>{country.callingCodes.map(code=>{
        return <span key={code}>{code} </span> 
      })}</h2>
      </div>
      
      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Region</h3>
      <h2>{country.region}( {country.subregion} )</h2>
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Top Level Domain</h3>
      <h2>{country.topLevelDomain}</h2>
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Population</h3>
      <h2>{country.population}</h2>
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Time Zones</h3>
      <h2>{country.timezones.map(timeZone=>{
        return <span key={timeZone}>{timeZone}<br/></span>
      })}</h2>
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h3>Country Area</h3>
      <h2>{country.area} Km<sup>2</sup></h2>
      </div>

      <div className='detailTile' style={{background:colors[parseInt(Math.random()*3)]}}>
      <h2>Latitude {country.latlng[0]}</h2>
      <h2>Longitude {country.latlng[1]}</h2>
      </div>
    </div>:''
  );
}

export default DetailTiles;