import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Manejo = ({ ip }) => {
  const [dato, setDato] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ip) {
      axios.get(`https://ipinfo.io/${ip}/geo`)
        .then(response => {
          setDato(response.data);
          setError(null);
        })
        .catch(err => {
          setDato(null);
          setError('El servicio no responde');
        });
    }
  }, [ip]);  // Dependencia para que se ejecute cada vez que cambie la IP

  if (error) return <div className="alert alert-danger mt-3">{error}</div>;
  if (!dato) return null;

  return <pre className="mt-3">{JSON.stringify(dato, null, 2)}</pre>;
}

export {Manejo};
