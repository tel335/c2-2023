import { getInfoOfIpv4, saveInfo } from "../funciones/peticiones";
import { useState } from "react";
import { useEffect } from "react";
import { ipv4Valida } from "../funciones/funciones";

export default function BuscadorDeIp() {
    const variablePrueba = {
        "ip": "161.185.160.93",
        "hostname": "ip-116-233.219.201.wom.cl",
        "city": "New York City",
        "region": "New York",
        "country": "US",
        "loc": "40.7143,-74.0060",
        "org": "AS22252 The City of New  York",
        "postal": "10004",
        "timezone": "America/New_York",
        "readme": "https://ipinfo.io/missingauth"
    }
    const variablePrueba2 = {
        "ip": "161.4",
        "city": "New York City",
        "region": "New York",
        "country": "US",
        "loc": "40.7143,-74.0060",
        "org": "AS22252 The City of New York",
        "postal": "10004",
        "timezone": "America/New_York",
        "readme": "https://ipinfo.io/missingauth"
    }
    const mensajes={
        "caso1":"",
        "caso2":"formato no valido",
        "caso3":"error"
    }
    const [ipEnInput, setIpEnInput] = useState('');
    const [ip, setIp] = useState(variablePrueba); //info de la ip
    const [habilitar, setHabilitar] = useState(false);
    const [buscar, setBuscar] = useState(false);
    const [valides, setvalides]=useState("")
    const [Guardar,setGuardar]=useState(false)
    //cuando se modifica la ip

    useEffect(()=>{
        const guardarInfo=async()=>{
            saveInfo(ip)}
            guardarInfo()
    },[Guardar]
    )

    useEffect(() => {
        const buscarIp = async () => {
            const info = await getInfoOfIpv4(ipEnInput);
            if(info==null){
                setvalides(mensajes.caso3)
            }
            setIp(info);
            setBuscar(false)
        }
        buscarIp();
    }, [buscar]);
    //cambia la ip de la carta cuando se preciona el boton

    //cuando se modifica el input
    useEffect(() => {
        const habilitarBoton = () => {
            if (ipv4Valida(ipEnInput)) {
                setHabilitar(true);
                setvalides("")
            }
            else {
                setHabilitar(false);
                setvalides(mensajes.caso2)

            }
        }
        habilitarBoton();
    }, [ipEnInput]);
    //para habilitar el boton buscar
    useEffect(() => {
        if (habilitar) {
            document.getElementById("botonBuscar").disabled = false;
        }
        else {
            document.getElementById("botonBuscar").disabled = true;
        }
    }, [habilitar]);
    

    
    //para mostrar info en carta


    return (
        <>
            <input placeholder="Introduce tu Ip" onChange={(e) => { setIpEnInput(e.target.value) }}></input>
            {/*boton busrcar ip*/}
            <button id="botonBuscar" onClick={() => setBuscar(true)} className="btn btn-primary" disabled>Buscar</button>
            <br></br>
            <p>{valides}</p>
            <br></br>
            <div id="Informacion segun ip" className="card" style={{ width: "18rem" }}>
                <div class="card-body">
                    <h5 class="card-title">Info segun IP</h5>
                    <p class="card-text">ip </p>
                    <p class="card-text">{ip.ip}</p>
                    <p class="card-text">hostname </p>
                    <p class="card-text">{ip.hostname}</p>
                    <p class="card-text">city </p>
                    <p class="card-text">{ip.city}</p>
                    <p class="card-text">region </p>
                    <p class="card-text">{ip.region}</p>
                    <p class="card-text">country </p>
                    <p class="card-text">{ip.country}</p>
                    <p class="card-text">loc</p>
                    <p class="card-text">{ip.loc}</p>
                    <p class="card-text">org</p>
                    <p class="card-text">{ip.org}</p>
                    <p class="card-text">postal</p>
                    <p class="card-text">{ip.postal}</p>
                    <p class="card-text">timezone </p>
                    <p class="card-text">{ip.timezone}</p>
                    <p class="card-text">readme</p>
                    <p class="card-text">{ip.readme}</p>
                </div>
            </div>
            <button className="btn btn-secondary" onClick={() => setGuardar(true)} >Guardar</button>


        </>
    )

}
