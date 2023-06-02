import React, { useState } from 'react';

function SearchPage() {
  //creacion de los estados
  const [ipAddress, setIpAddress] = useState(''); //guarda la direccion ip que se ingresa
  const [isValidIp, setIsValidIp] = useState(false); //indica si la direccion ip es valida o no
  const [searchResult, setSearchResult] = useState(null); // guarda el resultado del search
  const [errorMessage, setErrorMessage] = useState(''); //manipulacion errores 

  const handleInputChange = (event) => { //evento de escribir, cambiar y setear el input donde se ingresa la direccion ip
    const inputValue = event.target.value;
    setIpAddress(inputValue);
    setIsValidIp(validateIpAddress(inputValue));
    setErrorMessage('');
  };

  const handleSearch = () => {
    if (isValidIp) {
      fetchIpAddressData(); //se obtienen los datos de la direccion
    } else {
      setErrorMessage('Error con el formato de la direccion, intente denuevo');
    }
  };

  const fetchIpAddressData = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/geo`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        setErrorMessage('Error al obtener los datos de la direccion IP');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const validateIpAddress = (ip) => {
    const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return ipRegex.test(ip);
  };

  return (
    <div>
      <h1>CONTROL 2 TEL-335</h1>
      <div>
        <input
          type="text"
          placeholder="Ingrese una dirección IP"
          value={ipAddress}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch} disabled={!isValidIp}>
          Buscar
        </button>
      </div>
      {searchResult && (
        <div>
          <h2>Información de la dirección IP:</h2>
          <p>Dirección IP: {searchResult.ip}</p>
          <p>Ubicación: {searchResult.city}, {searchResult.region}, {searchResult.country}</p>
          <p>Proveedor de Internet: {searchResult.org}</p>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SearchPage;