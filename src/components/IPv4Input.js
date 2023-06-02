import React from 'react';
import { VerificadorV4 } from '../functions';

export class IPv4Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      if(VerificadorV4(this.state.value)){
        alert('La dirección IPv4 ingresada es: ' + this.state.value);
        event.preventDefault();
      }
      else{
        alert('La dirección IPv4 ingresada es inválida, intente nuevamente');
        event.preventDefault()
      }

    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Ingrese una dirección IPv4: 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }