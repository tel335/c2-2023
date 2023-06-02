function IpInput(props){



    const checkInput = (input) => {
        const Ip = input.split(".")
        

        if(Ip.length !== 4){
            props.setValid(false)
            return
        }

        let valid = true

        Ip.forEach((number) => {
            if((Number(number) > 255) || (Number(number) < 0) || (number === '')){
                valid=false  
            }
        })

        console.log(valid)

        props.setValid(valid)
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