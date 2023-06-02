// BuscadorIP.js
import React, { useState } from "react";
import axios from 'axios';
let gummy = { //objeto creado como reemplazo del axios.get a la api
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
  const [data, setData] = useState(""); //ahora lo defino como string vacio en vex de null solo pq no funciona la api

  const handleChange = (event) => {
    setIP(event.target.value);
  }

  const handleClick = async () => {
    try {
      //const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setData(gummy); //acá iría response.data en el parentesis, si funcionara el axios.get
    } catch (error) {
      console.error('Error al obtener información de IP:', error);
    }
  }

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick} disabled={!ip}>Buscar</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default BuscadorIP;
