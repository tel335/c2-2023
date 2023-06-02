import {
    Center,
    Heading,
    VStack
} from "@chakra-ui/react"
import Casos from "./components/Casos";

const urlIP = "https://ipinfo.io/"
const urlPost = "https://jsonplaceholder.typicode.com/posts"
const regex = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/

function App() {
    return (
        <Center>
            <VStack gap={4}>
                <Heading mt={"15px"}>CONTROL 2 TEL-335</Heading>
                <Casos urlIP={urlIP} regex={regex} urlPost={urlPost}></Casos>
            </VStack>
        </Center>
    );
}

export default App;
