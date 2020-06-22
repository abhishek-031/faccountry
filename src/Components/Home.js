import React from 'react';
import 'whatwg-fetch';
import CountryTile from './CountryTile';
import { CSSTransition } from 'react-transition-group';

class Home extends React.Component{
  constructor(){
    super();
    this.state={
      countries:[],
      search:'',
      show:false,
    };
    this.countries=[];
  }

  async loadData(){
    const data = await fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag',{
      method:'get'
    });
    const d = await data.json();
    this.countries = d;
    this.setState({
      countries:d,
      show:true,
    });
  }

  componentDidMount(){
    this.loadData();
  }

  onSearch(e){
    const searchText = e.target.value;
    if(searchText===''){
      this.setState({
        countries:this.countries,
        search:'',
      });
      return;
    }
    const searchedCountries = this.countries.filter(country=>{
      return country.name.toLowerCase().startsWith(searchText.toLowerCase());
    })
    if(searchedCountries.length===0){
      this.setState({
        countries:undefined,
        search:searchText,
      });
      return;
    }
    this.setState({
      countries:searchedCountries,
      search:searchText,
    });
  }

  render(){
    let countries;
    if(this.state.countries!==undefined){
      countries = this.state.countries.map(country=>{
        return (
          <CountryTile key={country.alpha3Code} country={country} />
        )
      });
    }
    else{
      countries=<h3 style={{fontSize:28,color:"#ffd700"}}>No Countries with that Name, try something else!</h3>
    }
    return (
      <div id='rootr'>
      <input className='countryInput' name='country' placeholder='Search' value={this.state.search} type='text' onChange={e=>{this.onSearch(e)}} />
      <br />
      <CSSTransition in={this.state.show} timeout={700} classNames='display'>
        <div>
        <div className='countryTiles'>
          {countries}
        </div>
        </div>
        </CSSTransition>
      </div>
    )
  }

}

export default Home;