import React from 'react';
import { Link } from 'react-router-dom';

export default class Border extends React.Component{
  constructor(){
    super();
    this.state={
      countries:[],
    };
  }

  async loadData(){
    let query=`https://restcountries.eu/rest/v2/alpha?codes=`;
    for(let i=0;i<this.props.borders.length;i++){
      query+=(this.props.borders[i]+';');
    }
    query+='&fields=flag;name;alpha3Code;'
    const data = await fetch(query,{
      method:'get'
    });
    const d = await data.json();
    this.setState({
      countries:d,
    });
  }

  componentDidMount(){
    this.loadData();
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      this.loadData();
    }
  }

  render(){
    return(
      this.state.countries.length!==0?
      <div className='countryTiles'>
        {this.state.countries.map(country=>{
          return (
            <Link className='countryTile' to={`/${country.alpha3Code}`} key={country.alpha3Code}>
              <img className='countryFlag' src={country.flag} height={100} width={200} alt={country.alpha3Code} />
              <h3 className='countryTitle'>{country.name}</h3>
            </Link>
          )
        })}
      </div>:''
    );
  }
}