/* no funciona sin generar multiples llamadas al sistema
import axios from 'axios';


function Boton(ip){
    const url= "https://ipinfo.io/:ipv4/geo";
    const nuevaurl = url.replace(':ipv4', ip)
    axios.get(nuevaurl).then(response => {
        const data= response.data
    });

    return (
        <div>
          {}
          <h2>ip: {data.ip}</h2>
          <p>hostname: {data.hostname}</p>
        </div>
      )
    

}
export default Boton;*/