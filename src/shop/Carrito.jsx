import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

function Carrito() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await fetch('https://bazar-backend-ynxj.onrender.com/shopCar');
        if (response.ok) {
          const data = await response.json();
          setProductosCarrito(data);
          calcularTotal(data);
        } else {
          console.error("Error al obtener los productos del carrito");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchCarrito();
  }, []);

  const calcularTotal = (productos) => {
    const totalCalculado = productos.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);
    setTotal(totalCalculado);
  };

  const eliminarProducto = async (productId) => {
    console.log("Intentando eliminar el producto con ID:", productId); 
    try {
      const response = await fetch(`https://bazar-backend-ynxj.onrender.com/shopCar/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const nuevosProductos = productosCarrito.filter(producto => producto.productId !== productId);
        setProductosCarrito(nuevosProductos);
        calcularTotal(nuevosProductos);
      } else {
        const errorMessage = await response.text();
        console.log("Error al eliminar el producto:", errorMessage);
        console.error("Código de error:", response.status);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
};


  const generarIdAleatorio = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const realizarCompra = async () => {
    const compra = {
      id: uuidv4(), 
      fecha: new Date().toLocaleString(),
      total: total,
      productos: productosCarrito.map(prod => ({
        id: generarIdAleatorio(),
        productId: prod.productId,
        title: prod.title,
        price: prod.price,
        image: prod.image,
        description: prod.description,
        quantity: prod.quantity,
      })),
    };

    console.log("Datos Compra",compra)
  
    try {
      const response = await fetch('https://bazar-backend-ynxj.onrender.com/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compra),
        
      });
  
      if (response.ok) {
        toast.success(`Venta realizada con exito <3 !`, {
          position: "top-right", 
          autoClose: 5000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true,
          draggable: true, 
          progress: undefined, 
        });
        setProductosCarrito([]); 
        setTotal(0);  
      } else {
        console.error("Error al registrar la compra");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-white text-3xl mb-6">Carrito de Compras</h1>
        <div className="flex flex-wrap -m-4">
          {productosCarrito.length > 0 ? (
            productosCarrito.map((producto) => (
              <div key={producto.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={producto.image}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{producto.category || "Producto"}</h3>
                  <h2 className="text-white title-font text-lg font-medium">{producto.title}</h2>
                  <p className="mt-1">${producto.price}</p>
                  <p className="text-gray-500 text-sm mt-1">Cantidad: {producto.quantity}</p>
                  <button
                    onClick={() => eliminarProducto(producto.productId)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No tienes productos en el carrito.</p>
          )}
        </div>

        {productosCarrito.length > 0 && (
          <div className="mt-8">
            <p className="text-white text-lg">Total: ${total.toFixed(2)}</p>
            <button
              onClick={realizarCompra}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Realizar Compra
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
}

export default Carrito;
