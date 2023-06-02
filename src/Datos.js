import React from 'react';

function Datos({ datos }) {
  return (
    <div className="datos-geolocalizacion">
      <h2>Informacion obtenida mediante API:</h2>
      <p>ip: {datos.ip}</p>
      <p>city: {datos.ciudad}</p>
      <p>region: {datos.region}</p>
      <p>country: {datos.pais}</p>
      <p>provider: {datos.org}</p>
      <p>org: {datos.loc}</p>
      <p>postal: {datos.postal}</p>
      <p>timezone: {datos.timezone}</p>
      <p>readme: {datos.readme}</p>
    </div>
  );
}

export default Datos;
