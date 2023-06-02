import "./App.css";
import inputIP from "./input"; //LLAMARLO PARA PROBAR EL CASO 1
import BuscadorIP from "./caso2"; //LLAMARLO EN RETURN PARA PROBAR CASO 2, QUE TAMBIEN CUMPLE CON CASO 1 (LOGICAMENTE)

function App() {
  return (
    <div className="App">
      <h1>Certamen 2 Apps webs</h1>
      <BuscadorIP />
    </div>
  );
}

export default App;
