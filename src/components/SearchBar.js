import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Form, FormControl, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

import { getIp } from '../api/api';


function SearchBar() {
    const [inputIpText, setSearchQuery] = useState('');
    const [isValidIPv4, setIsValidIPv4] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
  
    function searchIp() {
        const setIp = async () => {
            let response = await getIp(inputIpText);
            console.log(response);
            setModalContent(response);
        };
        setIp();
        setShowModal(true);
        console.log('Search:', inputIpText);
    };

    function handleClose() {
        setShowModal(false);
        setModalContent([]);
    }
  
    const validateIPv4 = (input) => {
      const ipAddressRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      return ipAddressRegex.test(input);
    };
  
    const handleChange = (e) => {
      const inputValue = e.target.value;
      setSearchQuery(inputValue);
      setIsValidIPv4(validateIPv4(inputValue));
    };
    // returns a warning message if the ip is not valid

    return (

    <div>
          <div style={{display: 'grid', justifyContent: 'center'}}>
              <Form inline className='' >
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={inputIpText}
                  onChange={handleChange}
                />
                <Button variant="primary" onClick={searchIp} disabled={!isValidIPv4}>
                  Search
                </Button>
                <h2 style={{color: 'red'}}>{isValidIPv4 ? '' : 'Invalid IPv4 address :('}</h2>
                <h2 style={{color: 'Green'}}>{!isValidIPv4 ? '' : 'Valid IPv4 address :)'}</h2>
              </Form>
          </div>
          <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton style={{borderBottom: 'none'}}>
                    <Modal.Title>Tu ip es: {inputIpText}</Modal.Title>
                    <Modal.Body>
                        <div style={{display: 'grid', justifyContent: 'center'}}>
                            <h2 style={{color: 'red'}}>{modalContent=='error 429' ? modalContent : ''}</h2>
                            <h2>{modalContent!='error 429' ?  modalContent :''}</h2>
                        </div>

                    </Modal.Body>
                </Modal.Header>
            </Modal>
    </div>
    );
  }
export default SearchBar;

