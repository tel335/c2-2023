
//CASO 2 (LOS HICE POR SEPARADO PERO LOS VOY LLAMANDO O NO EN EL APP.JS)
import React, { useState } from "react";

const BuscadorIP = () => {
  const [ip, setIP] = useState('');
  
  const defaultData = {
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

  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  // constanten que verifica el formato de la ipv4  tengo q ingresar
  const isValidIP = (ip) => {
    var regEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regEx.test(ip);
  }

  const handleChange = (event) => {
    if (isValidIP(event.target.value)) { //si se cumple q la id sea verificada como correcta
      setError(null);
      setIP(event.target.value);//entonces actualizo el valor de la ip a la ingresada
    } else {
      setError('El formato de IP no es válido.'); //aviso que no es valida y no hbailito el boton
      setIP(''); // reinicio la ip
    }
  }

  const handleClick = () => {
    setData(defaultData); 
    setError(null); // clear any previous errors
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