import axios from "axios"
export function VerificadorV4(IP_Dir){ //Funcion para asegurarnos de que el valor ingresado es una direccion IPv4 valida
    let octetos_s = IP_Dir.split('.')
    let octetos = octetos_s.map(oct => Number(oct)) //Extraemos los octetos y los convertimos a numero 
    for (let oct of octetos){
        if (oct < 0 || oct > 255 || isNaN(oct)){
            return false
        }
    }
    return true
}

export function getData(IP_Dir){
    let url = "https://ipinfo.io/"+IP_Dir+"/geo"
    let data = axios.get(url).data
    return data
}