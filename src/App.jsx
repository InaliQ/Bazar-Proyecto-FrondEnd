import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './shop/Inicio';
import DetalleProducto from './shop/DetalleProducto';
import Header from './shared/Header';
import Footer from './shared/Footer';
import Carrito from './shop/Carrito';
import Ventas from './shop/Ventas';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/product/:id" element={<DetalleProducto />} />
        <Route path="/shopCar" element={<Carrito/>} />
        <Route path="/sales" element={<Ventas/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
