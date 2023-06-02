import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inicio } from './components/Inicio';
import './App.css';


function App() {

  

  return (
    <div className="contenedor">      
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Inicio></Inicio>}></Route>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
