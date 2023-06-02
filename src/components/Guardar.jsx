import React, { useState } from 'react';
import axios from 'axios';

const Guardar = ({ dato }) => {
   
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState(null);

  
  const guardarDato = () => {
    const solicitud = {
      ip: dato.ip,
      city: dato.city,
      region: dato.region,
      country: dato.country
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', solicitud)
      .then(response => {
        if (response.status === 201) {
          setGuardado(true);
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }

  if (!dato) return null;

  return (
    <div>
      {guardado ? (
        <div className="alert alert-success">Datos guardados correctamente</div>
      ) : (
        <button className="btn btn-success mt-3" onClick={guardarDato}>Guardar</button>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export {Guardar};
