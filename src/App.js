import "./App.css";
import InputIP from "./input"; //LLAMARLO DENTRO DEL RETURN PARA PROBAR EL CASO 1 AISLADO
import BuscadorIP from "./caso2"; //LLAMARLO EN RETURN PARA PROBAR CASO 2, QUE TAMBIEN CUMPLE CON CASO 1 (LOGICAMENTE)
import Input3 from "./caso3"//lo llamo por si se quiere probar el caso3
import Input4 from "./pregunta2"
function App() {
  return (
    <div className="App">
      <h1>Certamen 2 Apps webs</h1>
      <Input4 />
    </div>
  );
}

export default App;
