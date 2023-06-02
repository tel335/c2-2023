import axios from "axios";

const obtenerIp = async (state, ip) =>{
    const peticion = await axios.get(`https://ipinfo.io/${ip}/geo`)
    state(peticion)
}

export{ obtenerIp}