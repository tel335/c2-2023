import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Escritos from './Escritos';
import Datos from './Datos';
import './App.css';

function App() {
  const [direccionIp, setDireccionIp] = useState('');
  const [datosGeolocalizacion, setDatosGeolocalizacion] = useState(null);
  const [ipValida, setIpValida] = useState(false);
  const [error, setError] = useState('');
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [guardadoFallido, setGuardadoFallido] = useState(false);
  const [coordenadas, setCoordenadas] = useState(null);

  const handleChange = (event) => {
    const ip = event.target.value;
    setDireccionIp(ip);
    setIpValida(validateIP(ip));
  };

  const validateIP = (ip) => {
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://ipinfo.io/${direccionIp}/geo`);
      setDatosGeolocalizacion(response.data);
      setError('');
      setGuardadoExitoso(false);
      setGuardadoFallido(false);
      setCoordenadas(response.data.loc.split(',').map(parseFloat));
    } catch (error) {
      console.log(error);
      setError('Error al obtener los datos');
    }
  };

  const handleSimulate = () => {
    const simulatedData = {
      ip: '161.185.160.93',
      ciudad: 'New York City',
      region: 'New York',
      pais: 'US',
      loc: '40.7143,-74.0060',
      org: 'AS22252 The City of New York',
      postal: '10004',
      timezone: 'America/New_York',
      readme: 'https://ipinfo.io/missingauth',
    };
    setDatosGeolocalizacion(simulatedData);
    setError('');
    setGuardadoExitoso(false);
    setGuardadoFallido(false);
    setCoordenadas(simulatedData.loc.split(',').map(parseFloat));
  };

  const handleGuardar = async () => {
    try {
      const data = {
        ip: datosGeolocalizacion.ip,
        city: datosGeolocalizacion.city,
        region: datosGeolocalizacion.region,
        country: datosGeolocalizacion.country,
      };
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      if (response.status === 201) {
        setGuardadoExitoso(true);
        setGuardadoFallido(false);
      } else {
        setGuardadoExitoso(false);
        setGuardadoFallido(true);
      }
    } catch (error) {
      console.log(error);
      setGuardadoExitoso(false);
      setGuardadoFallido(true);
    }
  };

  return (
    <div className="programa">
      <h1>API C2 TEL-335</h1>
      <div className="campo-container">
        <Escritos
          valor={direccionIp}
          onChange={handleChange}
          placeholder=" Introduzca una dirección IPv4 válida"
        />
        {!ipValida && <p className="fallo">Formato de IP no válido</p>}
        <div className="botones-container">
        <button
        className="boton"
        disabled={!ipValida}
        onClick={handleSubmit}
      >
        Buscar con API
      </button>
      <button className="boton" onClick={handleSimulate}>
        Buscar simulación
      </button>
    </div>
  </div>
  {error && <p className="fallo">{error}</p>}
  {datosGeolocalizacion && (
    <Datos datos={datosGeolocalizacion} />
  )}
  {coordenadas && (
    <div className="mapa-container">
      <MapContainer center={coordenadas} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordenadas} />
      </MapContainer>
    </div>
  )}
  {datosGeolocalizacion && (
    <button className="boton-guardar" onClick={handleGuardar}>
      Guardar
    </button>
  )}
  {guardadoExitoso && (
    <p className="mensaje-exito">Se han guardado los datos correctamente.</p>
  )}
  {guardadoFallido && (
    <p className="mensaje-fallo">Error al guardar los datos, hágalo nuevamente.</p>
  )}
</div>
);
}

export default App;