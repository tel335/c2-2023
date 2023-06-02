import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'



function Pregunta1() {
    const [ipv4, setIpv4] = useState('');
    const [show, setShow] = useState(false);
    const [ipv4Data, setIpv4Data] = useState([]);
    const [ipv4DataSaved, setIpv4DataSaved] = useState([]);
    const [show2, setShow2] = useState(false);

    const dummyObject = {
        "ip": "161.185.160.93",
        "city": "New York City",
        "region": "New York",
        "country": "US",
        "loc": "40.7143,-74.0060",
        "org": "AS22252 The City of New York",
        "postal": "10004",
        "timezone": "America/New_York",
        "readme": "https://ipinfo.io/missingauth"
    };

    function handleClose() {
        setShow(false);
    }

    function onChange(event) {
        setIpv4(event.target.value)
    }

    function checkValidIp(ip) {
        if (/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
            return true;
        }
        return false;

    }

    function onClick() {
        if (checkValidIp(ipv4)) {
            const searchForIp = async () => {
                let url = "https://ipinfo.io/" + ipv4 + "/geo";
                // await axios.get({
                //     method: 'GET',
                //     url: url,
                // }).then((res) => {
                //     setIpv4Data(res);
                //     setShow(true);

                // }).catch((err) => {
                //     alert('Error');

                // });


                //Caso de todo OK
                setIpv4Data(dummyObject);
                setShow(true);

            }
            searchForIp();

        }
    }

    function onSave() {
        if (ipv4Data != '') {
            const post = async () => {
                let url = "https://jsonplaceholder.typicode.com/posts";
                // await axios.post({url: url, data: ipv4Data})
                // .then((res) => {
                //     setIpv4DataSaved(res);
                //     setShow2(true);


                // }).catch((err) => {
                //     alert('Error, la data no ha podido ser guardad');
                // });



                //Caso de todo OK
                setIpv4DataSaved(ipv4Data);
                setShow2(true);

            }

            post();

        }
    }

    return (
        <div>
            <div style={{ paddingBottom: '25px', paddingTop: '25px', paddingRight: '100px', paddingLeft: '100px' }}>
                <Card >
                    <Card.Body className='center'>
                        <Card.Title>Preguntar por IP</Card.Title>
                        <div style={{ height: '20px' }}></div>
                        <form style={{ display: 'grid', justifyContent: 'center' }}>
                            <label>
                                IPv4:
                                <div style={{ height: '5px' }}></div>
                                <input type="text" value={ipv4} onChange={(event) => { onChange(event) }} name="name" />
                            </label>
                            {checkValidIp(ipv4) || ipv4 == '' ?
                                null
                                :
                                <p className='warningText'>IP no valida</p>}

                            <div style={{ height: '5px' }}></div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Button variant={checkValidIp(ipv4) ? 'primary' : 'secondary'} onClick={onClick}> Buscar </Button>
                                <Button variant={ipv4Data != '' ? 'primary' : 'secondary'} onClick={onSave}> Guardar </Button>

                            </div>

                        </form>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>IP Info</Modal.Title>
                    <Modal.Body>
                        {Object.keys(ipv4Data).map(key => (
                            <p key={key}>{key}: {ipv4Data[key]}</p>
                        ))}
                        <div style={{height: '100px', width: '100px'}}>
                            <MapContainer center={[String(ipv4Data.loc).split(',')[0], String(ipv4Data.loc).split(',')[1]]} zoom={100} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[String(ipv4Data.loc).split(',')[0], String(ipv4Data.loc).split(',')[1]]}>
                                </Marker>
                            </MapContainer>
                        </div>

                    </Modal.Body>
                </Modal.Header>
            </Modal>

            <Modal show={show2} onHide={() => setShow2(false)}>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>Data guardada</Modal.Title>
                    <Modal.Body>
                        {Object.keys(ipv4DataSaved).map(key => (
                            <p key={key}>{key}: {ipv4DataSaved[key]}</p>
                        ))}
                        <div style={{height: '100px', width: '100px'}}>
                            <MapContainer center={[String(ipv4DataSaved.loc).split(',')[0], String(ipv4DataSaved.loc).split(',')[1]]} zoom={100} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[String(ipv4DataSaved.loc).split(',')[0], String(ipv4DataSaved.loc).split(',')[1]]}>
                                </Marker>
                            </MapContainer>
                        </div>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </div>

    );
}

export default Pregunta1;