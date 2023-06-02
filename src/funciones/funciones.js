export function ipv4Valida(ip) {
    if (ip.length < 7 || ip.length > 15) { 
        return false;
    }
    if(ip[0]==='.' || ip[ip.length-1]==='.'){
        return false;
    }
    let contadorPuntos=0;
    for (let i = 0; i < ip.length; i++) {
        if (ip[i]==='.') {
            contadorPuntos++;
            if (ip[i+1]==='.') {
                return false;
            }
        }
    }
    if (contadorPuntos!==3) {
        return false;
    }
    return true;
}