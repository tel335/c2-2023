import { useState } from "react"


function IpInput(props){

    const [valid, setValid] = useState(false)

    const checkInput = (input) => {
        const Ip = input.split(".")

        if(Ip.length !== 4){
            props.setInvalid()
            setValid(false)
            return
        }

        Ip.forEach((number) => {
            if((Number(number) > 255)){
                return
            }
        })

        props.setSearch(input)
    }

    return(
        <>
            <input 
                type='search' 
                onChange={(e) => {
                    checkInput(e.target.value)
                    }}>
            </input>
            
        </>



    )
}

export default IpInput