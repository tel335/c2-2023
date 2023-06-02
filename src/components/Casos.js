import {
    Center,
    Text,
    Input,
    Button,
    HStack,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import MapChart from "./MapChart";

const Casos = ({ urlIP, regex, urlPost}) => {

    const toast = useToast()
    const [isButtonDisable, setIsButtonDisable] = useState(true)
    const [inputValue, setInputValue] = useState("")
    const [response, setResponse] = useState({})
    const [isValidFormat, setIsValidFormat] = useState(false)
    const [isValidResponse, setIsValidResponse] = useState(true)
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)


    const checkIP = (string) => {
        return regex.test(string)
    }

    const inputHandler = (e) => {
        if (checkIP(e.target.value)) {
            setInputValue(e.target.value)
            setIsButtonDisable(!isButtonDisable)
            setIsValidFormat(!isValidFormat)
        }
    }

    const getData = (input) => {
        if (true) {
            setResponse({
                "ip": "161.185.160.93",
                "city": "New York City",
                "region": "New York",
                "country": "US",
                "loc": "40.7143,-74.0060",
                "org": "AS22252 The City of New York",
                "postal": "10004",
                "timezone": "America/New_York",
                "readme": "https://ipinfo.io/missingauth"
            })
            setIsValidResponse(!isValidResponse)
            setLat(response.loc.split(",")[0])
            setLong(response.loc.split(",")[1])
        } else {
            axios.get(urlIP + input + "/geo")
                .then((response) => {
                    setResponse(response.data)
                })
                .catch((error) => {
                    return (
                        toast({
                            title: 'Error al enviar la información',
                            description: `${error.message}`,
                            status: 'error',
                            duration: 5000,
                            isClosable: false,
                            position: "top-left"
                        })
                    )
                })
        }
    }

    const postData = (input) => {
        axios.post(urlPost, input)
        .then((response) => {
            return (
                toast({
                    title: 'Recurso guardado exitosamente',
                    description: `${"Código: " + response.status}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: false,
                    position: "top-left"
                })
            )
        })
        .catch((error) => {
            return (
                toast({
                    title: 'El recurso no pudo ser guardado',
                    description: `${"Código: " + error.status}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                    position: "top-left"
                })
            )
        })
    }

    return (
        <VStack>
            <Text fontSize={"2xl"}>Get IP data</Text>
            <HStack mb={"10px"}>
                <Input
                    onChange={inputHandler}
                    placeholder="Ingresa la IPv4"
                    type="text">
                </Input>
                <Button
                    onClick={() => { getData(inputValue) }}
                    isDisabled={isButtonDisable}>
                    Enviar
                </Button>
                <Button
                    onClick={() => { postData(response) }}
                    isDisabled={isValidResponse}>
                    Guardar
                </Button>
            </HStack>
            {
                isValidFormat ? <Text color={"green"}>Formato de IP válido</Text> : <Text color={"red"}>Formato de IP no válido</Text>
            }
            <Center>
                <TableContainer>
                    <Table variant='simple' w={"100%"} mt={"15px"}>
                        <Thead>
                            <Tr>
                                <Th>Clave</Th>
                                <Th>Valor</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>IP</Td>
                                <Td>{response.ip}</Td>
                            </Tr>
                            <Tr>
                                <Td>Ciudad</Td>
                                <Td>{response.city}</Td>
                            </Tr>
                            <Tr>
                                <Td>Región</Td>
                                <Td>{response.region}</Td>
                            </Tr>
                            <Tr>
                                <Td>País</Td>
                                <Td>{response.country}</Td>
                            </Tr>
                            <Tr>
                                <Td>Ubicación</Td>
                                <Td>{response.loc}</Td>
                            </Tr>
                            <Tr>
                                <Td>Organización</Td>
                                <Td>{response.org}</Td>
                            </Tr>
                            <Tr>
                                <Td>Postal</Td>
                                <Td>{response.postal}</Td>
                            </Tr>
                            <Tr>
                                <Td>Timezone</Td>
                                <Td>{response.timezone}</Td>
                            </Tr>
                            <Tr>
                                <Td>Readme</Td>
                                <Td><a href={response.readme}>{response.readme}</a></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>
            <MapChart lat={lat} long={long}></MapChart>
        </VStack>
    )
}

export default Casos;