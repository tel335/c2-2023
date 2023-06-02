import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function SearchIP() {

    // Hook para la IP ingresada
    const [textIP, setTextIP] = useState("")
    // Hook para estado del boton
    const [buttonDisabled, setButtonDisabled] = useState(true)

    //Hooh para defirnir si los datos se cargaron
    const [loaded, setDataLoaded] = useState(false)

    const [showData, setShowData] = useState(false);
    const [infoJson, setInfoJson] = useState("vacio")


    const isValidIPv4 = (ip) => {
        const pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return pattern.test(ip);
    };

    const handleInputChange = (event) => {
        const {value} = event.target;
        setTextIP(value);
        setButtonDisabled(!isValidIPv4(value));
        if(showData === true){
            setShowData(false);
        }

    }
   const handleClick = () => {
       if (!showData) {
           setShowData(true);
       }
    };

    const showMessage = () => {
        if(isValidIPv4(textIP) === false && textIP !== '')
            alert(`La dirección IP ${textIP} no es válida`)
    }


        // Codigo para hacer la peticion a la API se deja comentado, ya que se usa
        // el pobjeto jsonData
    useEffect(() => {
        const getAll = async() => {
            if (showData === true) {
                try {
                    const response = await axios.get(`https://ipinfo.io/${textIP}/geo`)
                    setInfoJson(response.data)
                    if (response.status !== 200){
                        throw new Error('Error en la solicitud');
                    }
                }catch (error) {
                    alert('Ocurrió un error al obtener los datos');

            }
        }
        getAll()
    }})

    const jsonData = {
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


    return (

        <Container className="mt-5">
            <Row>
                <h4> Ingrese una Dirección IPv4 para obtener su información geográfica</h4>
            </Row>
            <Row>
                <Col sm={4}>
                    <Form className="d-flex">
                        <input
                            type="text"
                            placeholder="Direccion IP..."
                            value={textIP}
                            onChange={handleInputChange}
                            onBlur={showMessage}
                        />
                        <Button
                            disabled={buttonDisabled}
                            onClick={handleClick()}
                        >
                            Buscar
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {showData && !buttonDisabled&&(
                    <div>
                        {Object.keys(jsonData).map(key => (
                            <p key={key}>{key}: {jsonData[key]}</p>
                        ))}
                    </div>
                )
                }
            </Row>
            <Row>
                <div>
                    {Object.keys(infoJson).map(key => (
                        <p key={key}>{key}: {jsonData[key]}</p>
                    ))}
                </div>
            </Row>
        </Container>
    );
}

export default SearchIP