
//CASO 2 (LOS HICE POR SEPARADO PERO LOS VOY LLAMANDO O NO EN EL APP.JS)
import React, { useState } from "react";
import axios from 'axios';

const gummy = {
    "ip": "161.185.160.93",
    "city": "New York City",
    "region": "New York",
    "country": "US",
    "loc": "40.7143,-74.0060",
    "org": "AS22252 The City of New York",
    "postal": "10004",
    "timezone": "America/New_York",
    "readme": "https://ipinfo.io/missingauth"
};

const BuscadorIP = () => {
  const [ip, setIP] = useState('');
  const [data, setData] = useState(""); 
  const [error, setError] = useState(null); // Nuevo estado para manejar los errores de validación

  //verifico la ipv4
  const isValidIP = (ip) => {
    var regEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regEx.test(ip);
  }

  const handleChange = (event) => {
    if (isValidIP(event.target.value)) {
      setError(null);
      setIP(event.target.value);
    } else {
      setError('El formato de IP no es válido.');
      setIP('');
    }
  }

  const handleClick = async () => {
    try {
      //const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setData(gummy); //acá iría response.data en el parentesis, si funcionara el axios.get
      setError(null); // clear any previous errors
    } catch (error) {
      console.error('Error al obtener información de IP:', error);
    }
  }

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick} disabled={!ip || error}>Buscar</button>
      {error && <p>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default BuscadorIP;
