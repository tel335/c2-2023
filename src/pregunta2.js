import React, { useState } from "react";
import axios from 'axios';
import './input4.css';
//IMPORTANTE: en esta pregunta comenté denuevo el get y simulé un status=200 para asumir que la api sí me retornó datos y poder guardarlos 
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

const Input4 = () => {
  const [ip, setIP] = useState('');
  const [data, setData] = useState(""); 
  const [error, setError] = useState(null); 
  const [saveStatus, setSaveStatus] = useState(null); //guardo el estado de guardado
  const [responseStatus, setresponseStatus] = useState(200); 

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
      
      // Verificar si la respuesta es OK
      if (responseStatus === 200) {
        setData(gummy);
        setError(null);
        setSaveStatus(null); // Reiniciar el estado del guardado
      } else {
        setError('El servicio no responde con estado OK. Por favor intente de nuevo más tarde.');
      }
      
    } catch (error) {
      console.error('Error al obtener información de IP:', error);
      setError('Ha ocurrido un error al buscar la información de IP. Por favor intente de nuevo más tarde.');
    }
  }

  const handleSave = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      
      // Verificar si la respuesta es 201 (Created)
      if (response.status === 201) {
        setSaveStatus('La data se ha guardado correctamente.');
      } else {
        setSaveStatus('Ha ocurrido un error al guardar los datos. Por favor intente de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setSaveStatus('Ha ocurrido un error al guardar los datos. Por favor intente de nuevo más tarde.');
    }
  }

  return (
    <div className="container">
      <input type="text" className="input" onChange={handleChange} />
      <button className="button" onClick={handleClick} disabled={!ip || error}>
        Buscar
      </button>
      {error && <p>{error}</p>}
      {data && (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button
            className="button"
            onClick={handleSave}
            disabled={saveStatus || !data}
          >
            Guardar
          </button>
          {saveStatus && <p>{saveStatus}</p>}
        </>
      )}
    </div>
  );
}

export default Input4;