import React from 'react';

export default class Currency extends React.Component{
  constructor(){
    super();
    this.state={
      conversions:undefined,
      converting:false,
      inputAmount:0,
      outputAmount:0,
    }
    this.mul = 1;
  }

  async loadData(){
    const rates = await fetch(`https://api.exchangeratesapi.io/latest?base=${this.props.currency.code}`,{
      method:'get',
    });
    const r = await rates.json();
    if(r.error){
      return;
    }
    this.setState({
      conversions:r.rates,
    });
  }

  componentDidMount(){
    this.loadData();
  }

  handleConvert(){
    this.setState({
      converting:true
    });
  }

  handleBack(){
    this.setState({
      converting:false,
      inputAmount:0,
      outputAmount:0,
    });
  }

  mulChange(e){
    this.mul = parseFloat(e.target.value);
    const outputAmount = Math.round((this.state.inputAmount*this.mul)*100)/100;
    this.setState({
      outputAmount
    })
  }

  inputChange(e){
    const inputAmount = parseFloat(e.target.value);
    const outputAmount = Math.round((inputAmount*this.mul)*100)/100;
    this.setState({
      inputAmount,
      outputAmount,
    });
  }

  outputChange(e){
    const outputAmount = parseFloat(e.target.value);
    const inputAmount = Math.round((this.state.inputAmount/this.mul)*100)/100;
    this.setState({
      inputAmount,
      outputAmount,
    });
  }

  render(){
    let view='';
    if(this.state.converting){
      view = (<div className='currency'>
        <h3>{this.props.currency.symbol}</h3> 
        <input type='number' name='inputAmount' value={this.state.inputAmount} onChange={e=>{this.inputChange(e)}}/>
        <h3>{' = '}</h3>
        <select onChange={e=>{this.mulChange(e)}}>
          <option value={1}>{this.props.currency.code}</option>
          {this.state.conversions?Object.keys(this.state.conversions).map(conversion=>{
            return <option key={conversion.toString()} value={this.state.conversions[conversion]}>{conversion}</option>
          }):''}
        </select>
        <input type='number' name='outputAmount' onChange={e=>{this.outputChange(e)}} value={this.state.outputAmount} />
        <button onClick={()=>{this.handleBack()}}> Back </button>
      </div>);
    }
    else{
      view = (
        <div className='currency'>
          <h4>{this.props.currency.symbol} ({this.props.currency.name})</h4>
          <button onClick={()=>{this.handleConvert()}}>Convert</button>
        </div>
      );
    }
    return (
      <>
        {view}
      </>
    );
  }
}