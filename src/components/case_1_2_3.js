// IMPORTANTE para probar la parte de axios cambiar en la linea: 108 handleSearchClick por handleSearchClick_axios

import { useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ValidIP from './validIP';

function Case_1_2_3() {
  const [ipAddress, setIPAddress] = useState('');
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [geoInfo, setGeoInfo] = useState(null);
  const [invalidIPMessage, setInvalidIPMessage] = useState('');
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  const objeto = {
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
  const handleInputChange = (e) => {
    const value = e.target.value;
    setIPAddress(value);
    setSearchButtonDisabled(!ValidIP(value));
    setInvalidIPMessage('');
  };

  const handleSearchClick = async () => {
  try {

    setGeoInfo(objeto);
      setShowModal(true);
      setSaveButtonDisabled(false);
      setSaveMessage('');

    
  } catch (error) {
    setInvalidIPMessage('Formato IP no valido');
    console.error('Error encontrando direccion IP :', error);
  }
};
  const handleSearchClick_axios = async () => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ipAddress}/geo`);
      if (response.status === 200) {
        setGeoInfo(response.data);
        setShowModal(true);
        setSaveButtonDisabled(false);
        setSaveMessage('');
      } else {
        setInvalidIPMessage('Error: No se pudo obtener información para la dirección IP especificada');
      }
    } catch (error) {
      setShowModal(false);
      console.error('Error buscando dirección IP:', error);
      setInvalidIPMessage('Error: No se pudo obtener información para la dirección IP especificada');
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        ip: geoInfo.ip,
        city: geoInfo.city,
        region: geoInfo.region,
        country: geoInfo.country
      });
      if (response.status === 201) {
        setSaveMessage('Guardado correctamente');
      } else {
        setSaveMessage('Error al guardar. Inténtalo de nuevo.');
      }
    } catch (error) {
      setSaveMessage('Error al guardar. Inténtalo de nuevo.');
      console.error('Error al guardar los datos:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setGeoInfo(null);
    setSaveButtonDisabled(true);
    setSaveMessage('');
  };

  return (
    <section id="buscadorDireccionIP">
      <Container style={{ marginTop: 40 }}>
        <Row>
          <Col className="text-left">
            <input
              type="text"
              value={ipAddress}
              placeholder="Introduce dirección IPv4"
              onChange={handleInputChange}
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                borderColor: 'black',
                borderRadius: '4px',
              }}
            />
            <Button
              variant="outline-primary"
              style={{ marginLeft: 20 }}
              size="lg"
              onClick={handleSearchClick}
              disabled={searchButtonDisabled}
            >
              Buscar
            </Button>
            {invalidIPMessage && <p>{invalidIPMessage}</p>}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informacion IP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {geoInfo && (
            <div>
              <p>IP Address: {geoInfo.ip}</p>
              <p>Hostname: {geoInfo.hostname}</p>
              <p>City: {geoInfo.city}</p>
              <p>Region: {geoInfo.region}</p>
              <p>Country: {geoInfo.country}</p>
              <p>Localization: {geoInfo.loc}</p>
              <p>Provider: {geoInfo.org}</p>
              <p>Postal Code: {geoInfo.postal}</p>
              <p>Timezone: {geoInfo.timezone}</p>
            </div>
          )}
          <Button
            variant="primary"
            onClick={handleSaveClick}
            disabled={saveButtonDisabled}
            style={{ marginTop: 20 }}
          >
            Guardar
          </Button>
          {saveMessage && <p>{saveMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default Case_1_2_3;
