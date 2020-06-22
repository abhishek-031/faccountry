import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import CountryDetails from './CountryDetails';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

function App(props){
  return (
    <>
    <Header />
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/:country' component={CountryDetails} />
    </BrowserRouter>
    <Footer/>
    </>
  )
}

export default App;