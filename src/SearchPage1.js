import React, { useState } from 'react';
// objeto dummy para evitar el error de conexion con el servidor
const SearchPage = () => {
  const dummyData = {
    ip: "161.185.160.93",
    city: "New York City",
    region: "New York",
    country: "US",
    loc: "40.7143,-74.0060",
    org: "AS22252 The City of New York",
    postal: "10004",
    timezone: "America/New_York",
    readme: "https://ipinfo.io/missingauth"
  };

  const [searchResult, setSearchResult] = useState(dummyData);

  return (
    <div>
      <h1>Control 2 TEL-335 Joaquin Aguilera 201930003-2</h1>
      <button onClick={() => setSearchResult(dummyData)}>Boton buscar (base)</button>
      {searchResult && (
        <div>
          <p>Ubicacion de la direccion ip: {searchResult.loc}</p>
          <p>Proveedor de internet: {searchResult.org}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;