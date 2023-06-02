function Ipval(ip){
    const patron = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const conf = patron.test(ip);
    return conf
    // eslint-disable-next-line no-unreachable
    const partes = ip.split(".");
    const num = partes.map(partes => parseInt(partes));
    if (num.every((valor) => !isNaN(valor))){
        return false
    }
    if(num.length < 4){
        return false
    }
    for (let i = 0; i < num.length; i++) {
        const numero = num[i];
        if (numero<0){
            return false
        }

        if (numero > 255) {
          return false
        }

    }
    return true

}
export default Ipval;