import React, { useState } from 'react';
import './SearchPage.css';

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
  const [saveMessage, setSaveMessage] = useState(''); //mensaje de guardado

  const handleSave = async () => { //el async permite el uso de await
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip: searchResult.ip,
          city: searchResult.city,
          region: searchResult.region,
          country: searchResult.country
        })
      });
      //console.log(response.status)
      if (response.status === 201) {
        setSaveMessage('Los datos han sido guardados correctamente.');
      } else {
        setSaveMessage('Error al guardar los datos, inténtalo de nuevo.');
      }
    } catch (error) {
      setSaveMessage('Error al conectar con el servidor. Revisa el flujo de red.');
    }
  };
  //aqui ocupamos el handleSave con disabled para que el usuario no presione varias veces el boton guardar, con uno basta
  return (
    <div>
      <h1>Control 2 TEL-335</h1>
      <button onClick={() => setSearchResult(dummyData)}>Buscar</button>
      {searchResult && (
        <div>
          <p>Ubicacion de la direccion ip: {searchResult.loc}</p>
          <p>Proveedor de internet: {searchResult.org}</p>
          <button onClick={handleSave} disabled={saveMessage !== ''}>
            Guardar
          </button>
          {saveMessage && <p>{saveMessage}</p>}
        </div>
      )}
      <img src={require('./imagenes/cg_disneyplus_mickey_thestoryofamouse_1124_136a0223.jpeg').default} alt="Mickey Mouse" />
    </div>
  );
};

export default SearchPage;