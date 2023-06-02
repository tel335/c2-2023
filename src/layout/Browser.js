import IpInput from '../components/ipInput'
import { useState } from 'react';
import SearchButton from '../components/searchButton';

function Browser(){

    const [IPinfo, setIPInfo] = useState({})
    const [validInput, setValidInput] = useState(false)
    const [search, setSearch] = useState('')

    return(
        <>
            <IpInput 
                setValid={setValidInput}
                setSearch = {setSearch}
            />
            
            <SearchButton 
                search={search}
                setInfo = {setIPInfo}
                valid= {validInput}
            />

            <h1>{validInput? 'valido' : 'not valid'}</h1>
            <h5>{IPinfo.op}</h5>
            <h5>{IPinfo.city}</h5>
            <h5>{IPinfo.region}</h5>
            <h5>{IPinfo.country}</h5>
            <h5>{IPinfo.loc}</h5>
            <h5>{IPinfo.org}</h5>
            <h5>{IPinfo.postal}</h5>
            <h5>{IPinfo.timezone}</h5>
            <h5>{IPinfo.readme}</h5>
        </>

    )
}

export default Browser