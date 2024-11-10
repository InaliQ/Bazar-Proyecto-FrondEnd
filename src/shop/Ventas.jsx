import React, { useState, useEffect } from 'react';

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVenta = async () => {
      try {
        const response = await fetch('https://bazar-backend-ynxj.onrender.com/sales');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setVentas(data);
        } else {
          console.error("Error al obtener las ventas");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchVenta();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-800">
          {ventas.length > 0 ? (
            ventas.map((venta) => (
              <div key={venta.id} className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-700">Venta #{venta.id}</span>
                  <span className="mt-1 text-gray-500 text-sm">Fecha: {new Date(venta.fecha).toLocaleDateString()}</span>
                  <span className="mt-1 text-gray-500 text-sm">Total: ${venta.total}</span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Productos Comprados</h2>
                  <br/>
                  {venta.productos.map((producto) => (
                    <div key={producto.id} className="mb-4">
                      <h3 className="text-gray-700 text-lg">{producto.title}</h3>
                      <p className="text-gray-500">Cantidad: {producto.quantity}</p>
                      <p className="text-gray-500">Precio: ${producto.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">No hay ventas registradas.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Ventas;
