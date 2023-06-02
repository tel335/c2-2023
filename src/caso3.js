
import React, { useState } from "react";
import axios from 'axios';

const Input3 = () => {
  const [ip, setIP] = useState('');
  const [data, setData] = useState(""); 
  const [error, setError] = useState(null); 

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
      const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      
      // Verificar si la respuesta es OK
      if (response.status === 200) {
        setData(response.data);
        setError(null);
      } else {
        setError('El servicio no responde con estado OK. Por favor intente de nuevo más tarde.');
      }
      
    } catch (error) {
      console.error('Error al obtener información de IP:', error);
      setError('Ha ocurrido un error al buscar la información de IP. Por favor intente de nuevo más tarde.');
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

export default Input3;
