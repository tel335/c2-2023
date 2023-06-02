import React, { useEffect, useState } from "react";
import { obtenerIp } from "../funciones/funciones";
import { Guardar } from "./Guardar";
import { Manejo } from "./Manejo";


const Inicio = () => {
    const [ip, setIp] = useState('')
    const [datos, setDatos] = useState(null);
    const [error, setError] = useState(null);
    

    const ipValida = {
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

    const changeBoton = (e) => {
        setIp(e.target.value);
    };

    //Esta funcion es una modificacion de https://es.stackoverflow.com/questions/276433/funcion-para-validar-ip-con-javascript
    const validarIp = (ip) => {
        var regEx = new RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
        return regEx.test(ip);
    }

    // Simulamos un error de la API
    const error_simulado = false;


    const submit = () => {
        if (validarIp(ip)) {
            if (error_simulado == true) {
                setError("No hay respuesta");
            }
            else {
                setDatos(ipValida);
            }

        } else {
            setError("Porfavor ingrese una ip valida");
        }
    }


    return (
        <div className="center-screen card">
            <h1 className="card-header text-center">GEO IP</h1>
            <div className="card-body">
                <input className="form-control" type="text" placeholder="Introducir IP" onChange={changeBoton} />
                <button className="btn btn-primary mt-3" onClick={submit} disabled={!validarIp(ip)}>Buscar</button>
                <Manejo ip={ip} />
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {datos && <pre className="mt-3">{JSON.stringify(datos, null, 2)}</pre>}
                <Guardar dato = {datos}></Guardar>
            </div>
        </div>

    )
}

export { Inicio }