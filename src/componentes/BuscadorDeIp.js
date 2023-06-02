import { getInfoOfIpv4 } from "../funciones/peticiones";
import { useState } from "react";
import { useEffect } from "react";

export default function BuscadorDeIp() {
    const [ip, setIp] = useState("");
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
        <input placeholder="Introduce tu Ip"></input>
        <button>Buscar</button>
        </>
    )

}