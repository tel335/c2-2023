import axios from "axios";


export async function getInfoOfIpv4(ipv4) {
  
    const response = await axios.get('https://ipinfo.io/'+ipv4 +'/geo');
    return response.data;
  
}

export async function saveInfo(ip,city,region,country){
    const response =await axios.post('https://jsonplaceholder.typicode.com/posts',{ip,city,region,country});
    return response.data;
} 


/*
{
    "ip": "201.219.233.116",
    "hostname": "ip-116-233.219.201.wom.cl",
    "city": "Santiago",
    "region": "Santiago Metropolitan",
    "country": "CL",
    "loc": "-33.4569,-70.6483",
    "org": "AS52341 WOM S.A.",
    "postal": "8320000",
    "timezone": "America/Santiago",
    "readme": "https://ipinfo.io/missingauth"
  }
  */