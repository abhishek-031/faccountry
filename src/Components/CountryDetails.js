import React from 'react';
import DetailTiles from './DetailTiles';
import { CSSTransition } from 'react-transition-group';
import Loader from 'react-loader-spinner';

class CountryDetails extends React.Component{
  constructor(){
    super();
    this.state={
      country:{},
      show:false,
    };
  }

  async loadData(){
    const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${this.props.match.params.country}`,{
      method:'get'
    });
    const d = await data.json();
    this.setState({
      country:d,
      show:true,
    });
  }

  componentDidMount(){
    this.loadData();
  }

  componentDidUpdate(prevProps){
    const { location :{ pathname: prevpathname }} = prevProps;
    const {location :{ pathname}} = this.props; 
    if(prevpathname!==pathname){
      this.loadData()
    }
  }

  render(){
    const {country} = this.state;
    const header = (
      <div className='countryHeader'>
        <img src={country.flag} alt={country.name} width={300}/>
        <div>
        <h2>{country.name}</h2>
        <h3> (Alpha 2 Code: {country.alpha2Code})</h3>
        <h3> (Alpha 3 Code: {country.alpha3Code}) </h3>
        </div>
      </div>
    );

    return (
      <div id='rootr'>
      {this.state.show?
      <CSSTransition in={this.state.show} classNames='display' timeout={400}> 
      <div>
        {header}
        <DetailTiles country={country} />
      </div>
      </CSSTransition>
      :<Loader type="TailSpin" color="#ffd700" height={80} width={80} style={{position:'absolute',top:'50vh',left:'50vw'}} />}
      </div>
    )
  }
}

export default CountryDetails;