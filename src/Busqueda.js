import React, {useState} from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import Ipval from './Ipval';
import Boton from './Boton';


function Busqueda() {
    const [ip, setIp] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:8080/api', {
                ip
            });
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.response);
            setSuccess(false);
        }
    };

    return (
        <div className="form-container">
            <form className='form' onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label for="Ipv4" className="form-label">
                        <p className="tittle-label">Ipv4</p>
                        <input type="Ipv4" className="form-control" id="exampleInputEmail1"
                               placeholder="XXX.XXX.XXX.XXX" aria-describedby="ip" value={ip}
                               onChange={(e) => setIp(e.target.value)}/>
                    </label>
                </div>
                    {Ipval(ip) ? (
                         <Button className="button" variant="outline-light" type="submit" /*onClick={Boton(ip)}*/>
                      Buscar
                     </Button>
                  ) : (
                    <label htmlFor="Error" className="form-label">
                     <p className="tittle-label">Ipv4 no válida</p>
                      </label>
             )}
            </form>
            {error && <div>{error}</div>}
            {success && <div>¡Registro exitoso!</div>}
        </div>
    );
}



export default Busqueda;