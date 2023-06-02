import './App.css';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [searchResultAux, setSearchResultAux] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);

    let flag = false
    let test = value.split(".")

    if (test.length === 4)
      test.forEach(val => {
        val = parseInt(val)
        if(val > 0 && val < 255){
          setErrorMessage('');
          flag= false
        }
        else{
          setErrorMessage('Formato no valido');
          flag= true
        }
      });
    else{
      flag = true
      setErrorMessage('Formato no valido');
    }

    if (test.length === 0 || test[0] === '')
      setErrorMessage('');

    setSearchDisabled(flag);
  };

  const handleSearch = () => {
    /*fetch(`https://ipinfo.io/${ipAddress}/geo`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al consultar la API');
        }
      })
      .then((data) => {
        setSearchResult(data);
        setErrorMessage('');
        setSaveMessage('');
      })
      .catch((error) => {
        setSearchResult(null);
        setErrorMessage(error.message);
        setSaveMessage('');
      });*/

    
    //Dummy dado por profesor
    const data = {
      "ip": "161.185.160.93",
      "city": "New York City",
      "region": "New York",
      "country": "US",
      "loc": "40.7143,-74.0060",
      "org": "AS22252 The City of New York",
      "postal": "10004",
      "timezone": "America/New_York",
      "readme": "https://ipinfo.io/missingauth"
    }
    setSearchResult(data)

    if (map) {
      let position = data.loc.split(',');
      let latitude = position[0]
      let longitude = position[1]
      map.setView([parseFloat(latitude), parseFloat(longitude)], 13);
      L.marker([parseFloat(latitude), parseFloat(longitude)]).addTo(map);
    }

    let newdata = {
      "ip": data.ip,
      "city": data.city,
      "region": data.region,
      "country": data.country,
    }
    setSearchResultAux(newdata)
  };

  const handleSave = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: searchResultAux
    })
      .then((response) => {
        if (response.status === 201) {
          setSaveMessage('Los datos se guardaron correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      })
      .catch((error) => {
        setSaveMessage('Error al guardar los datos. Por favor, inténtalo nuevamente.');
      });
  };

    return (
      <div className='principal'>
        <div className='search'>
          <div className='nav'>
            <h1>Buscador de IPv4!</h1>
            <hr></hr>
          </div>
          <h2>Ingresa la IPv4 que deseas buscar</h2>
          <input
            type="text"
            value={ipAddress}
            placeholder="Dirección IP"
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} disabled={searchDisabled}>
            Buscar
          </button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}

        {searchResult && (
          <div className="list">
            <h2>Información:</h2>
            {saveMessage && <p>{saveMessage}</p>}
            <li>IP: {searchResult.ip}</li>
            <li>Ciudad: {searchResult.city}</li>
            <li>Región: {searchResult.region}</li>
            <li>Pais: {searchResult.country}</li>
            <li>Locación: {searchResult.loc}</li>
            <li>Organización: {searchResult.org}</li>
            <li>Codigo Postal: {searchResult.postal}</li>
            <li>Timezone: {searchResult.timezone}</li>
            <li>Readme: {searchResult.readme}</li>
          
            <button onClick={handleSave}>
              Guardar
            </button>
          </div>
        )}

        <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
    );
}

export default App;