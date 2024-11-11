import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DetalleProducto() {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://bazar-backend-ynxj.onrender.com/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProducto(data);
        } else {
          console.error("Error al obtener los detalles del producto");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchProducto();
  }, [id]);

  const agregarAlCarrito = async () => {
    try {
      const response = await fetch('https://bazar-backend-ynxj.onrender.com/shopCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: producto.id,
          title: producto.title,
          price: producto.price,
          image: producto.thumbnail,
          description: producto.description,
          quantity: 1, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCarrito((prevCarrito) => [...prevCarrito, data]); 
        
        // Muestra una alerta bonita
        toast.success(`${producto.title} ha sido agregado al carrito!`, {
          position: "top-right", 
          autoClose: 5000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Error al agregar al carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={producto.thumbnail}
            onError={(e) => e.target.src = 'https://dummyimage.com/400x400'}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{producto.brand}</h2>
            <h1 className="text-white text-3xl title-font font-medium mb-1">{producto.title}</h1>
            <p className="leading-relaxed">{producto.description}</p>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="ml-3">{producto.rating} / 5.0 ⭐</span>
              </span>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
              <div className="flex">
                <span className="mr-3">Stock</span>
                <span>{producto.stock} unidades</span>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-white">${producto.price}</span>
              <span className="text-gray-500 ml-2 line-through">
                ${((producto.price * (100 + producto.discountPercentage)) / 100).toFixed(2)}
              </span>
              <button
                onClick={agregarAlCarrito}
                className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
              >
                Agregar al carrito
              </button>
            </div>
            <div className="mt-5">
              <h3 className="text-white mb-2">Imágenes del producto:</h3>
              <div className="flex space-x-2">
                {producto.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Producto ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => e.target.src = 'https://dummyimage.com/100x90'} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default DetalleProducto;
