import { Container, Modal, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Ejercicio1() {
  //Hook para determinar la ip
  const [ipAddress, setIpAddress] = useState("");
  //Hook para el botón Buscar
  const [buttonDisabled, setButtonDisabled] = useState(true);
  //Hook para mostrar los datos obtenidos de la página
  const [result, setObjeto] = useState(null);
  //Hook para mostrar el mensaje de erro
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  //Hook para el modal que muestra la información
  const [modalOpen, setModalOpen] = useState(false);
  //Hook para el botón de guardar una vez mostrada la información
  const [saveButton, setSaveButton] = useState(true);

  const objeto = {
    ip: "161.185.160.93",
    city: "New York City",
    region: "New York",
    country: "US",
    loc: "40.7143,-74.0060",
    org: "AS22252 The City of New York",
    postal: "10004",
    timezone: "America/New_York",
    readme: "https://ipinfo.io/missingauth",
  };

  //Variable que maneja por eventa el valor que se tiene de la ip, si es un valor correcto activará el botón
  const handleInputChange = (event) => {
    const value = event.target.value;
    setIpAddress(value);
    setButtonDisabled(!isValidIpAddress(value));
    setErrorMessage(isValidIpAddress(value) ? "" : "Dirección IP no válida");
  };

  //Variable que valida si la dirección ip es real y tiene el formato correcto: 
  //https://es.stackoverflow.com/questions/297196/validar-una-dirección-ip-con-javascript
  const isValidIpAddress = (value) => {
    const reg = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/gi;
    return reg.test(value);
  };

  //Función que maneja la búsqueda, lo cual permite obtener los valores de la api correspondientes
  const handleSearch = async () => {
    try {
      // Comenté esto ya que el servidor emitía el error 429
      // const response = await axios.get(`https://ipinfo.io/${ipAddress}/geo`);
      const data = objeto;
      setObjeto(data);
      setError("");
      setSaveButton(false);
      setModalOpen(true);
    } catch (error) {
      alert("Error 429");
    }
  };

  //Función que maneja los datos guardados para hacer post en la dirección correspondiente
  const handleSave = async () => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts");
      if (response.status === 201) {
        alert("Petición POST exitosa (Código 201)");
      }
      else{
        alert("Petición POST falló");
      }
      const data = response.data;
      setObjeto(data);
      setError("");
      setSaveButton(false);
    } catch (error) {
      alert("Error 429");
    }
    setModalOpen(false);
  };

  return (
    <div>
      <br />
      <Container style={{ maxWidth: "20%" }}>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter a valid IP" value={ipAddress} onChange={handleInputChange} />
            <br />
            <Button variant="primary" onClick={() => { handleSearch(); setModalOpen(true); }} disabled={buttonDisabled}>
              Buscar
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
          </Form.Group>
        </Form>
      </Container>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Información sobre la IP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {objeto ? (
            <div>
              <p>IP Address: {objeto.ip}</p>
              <p>City: {objeto.city}</p>
              <p>Region: {objeto.region}</p>
              <p>Country: {objeto.country}</p>
              <p>loc: {objeto.loc}</p>
              <p>org: {objeto.org}</p>
              <p>postal: {objeto.postal}</p>
              <p>timezone: {objeto.timezone}</p>
              <p>readme: {objeto.readme}</p>
              <Button onClick={handleSave} disabled={saveButton}>
                Guardar
              </Button>
            </div>
          ) : (
            error && <div>{error}</div>
          )}
        </Modal.Body>
      </Modal>
            <br></br>
      <Container style={{ maxWidth: "20%" }}>
            <Card style={{ backgroundColor: "#ADD8E6" }}>
              Breve explicación sobre el funcionamiento de la barra de búsqueda de direcciones IP:
              <br></br>
              - Se introduce una dirección válida y con el formato adecuado
              <br></br>
              - Botón buscar para obtener información
            </Card>
      </Container>
    </div>
  );
}

export default Ejercicio1;

