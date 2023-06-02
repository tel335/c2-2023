
import axios from "axios";

const BASE_URL = "https://ipinfo.io/";


// export const getIp = async (ip) => {    
//     const response = await axios.get(`${BASE_URL}${ip}/geo`);
//     return response.data;   
// };

export const getIp = async (ip) => {
    try {
      const response = await axios.get(`${BASE_URL}${ip}/geo`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log('Too Many Requests');
        return 'error 429';
      } else {
        console.log(error);
        return 'Error NOT 429';
      }
    }
  };