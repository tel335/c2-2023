import { getInfoOfIpv4 } from "../funciones/peticiones";
import { useState } from "react";
import { useEffect } from "react";

export default function BuscadorDeIp() {
    const variablePrueba={
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
    const [ip, setIp] = useState(variablePrueba);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const getInfo = async () => {
            const data = await getInfoOfIpv4(ip);
            setInfo(data);
        }
        getInfo();
    }, [ip]);

    return(
        <>
        <input placeholder="Introduce tu Ip" onChange={(e)=>setIp(e.target.value)}></input>
        <button onClick={()=>setIp(ip)} className="btn btn-primary">Buscar</button>
        <br></br>
        <button className="btn btn-secondary">Guardar</button>
        
        </>
    )

}