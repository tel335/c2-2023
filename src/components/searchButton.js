import { Button } from 'react-bootstrap'
import axios from 'axios'

const dummy_response = {
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

function SearchButton(props){

    const searchInfo = () => {
        axios.get(`https://ipinfo.io/${props.search}/geo`)
        .then((response => props.setInfo(response)))
        .catch((e) => props.setInfo(dummy_response))
        
    }

    return(
        <Button onClick={() => searchInfo()}>Browse</Button>

    )

}

export default SearchButton