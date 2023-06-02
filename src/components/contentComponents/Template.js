import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios'



function Template() {
    const [fact, setFact] = useState([]);
    const [show, setShow] = useState(false);

    function getRandomFact () {
        const getRandomData = async () => {
            let randomFact = await axios.get("https://api.chucknorris.io/jokes/random");
            setFact(randomFact.data);
        }
        getRandomData();
        setShow(true);
    }
    
    function handleClose() {
        setShow(false);
        setFact([]);
    }

    return (
        <div>
            <div style={{ paddingBottom: '25px', paddingTop: '25px', paddingRight: '100px', paddingLeft: '100px' }}>
                <Card >
                    <Card.Body className='center'>
                        <Card.Title>Function Title</Card.Title>
                        <div style={{height: '20px'}}></div>
                        <Button variant="primary" onClick={getRandomFact}>Button</Button>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{borderBottom: 'none'}}>
                    <Modal.Title>Modal Title</Modal.Title>
                    <Modal.Body>{fact.value}</Modal.Body>
                </Modal.Header>
            </Modal>
        </div>

    );
}

export default Template;