import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cambiar la URL a tu API backend
    fetch('https://bazar-backend-ynxj.onrender.com/products')  // Asegúrate de que esta URL sea la correcta
      .then(response => response.json())
      .then(data => {
        console.log("Datosssss", data);
        setProducts(data);  // Usa 'data' directamente, ya que es el array de productos
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
        <img
          className={`${
            searchTerm
              ? 'w-12 fixed top-4 left-4 transition-all duration-300'
              : 'lg:w-2/6 md:w-3/6 w-5/6 mb-10'
          } object-cover object-center rounded`}
          alt="hero"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGny1o1BXrmCQnFz3iszj10ngXwxBbnDrMGg&s"
        />

        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          {/* Header */}
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Bazar Universal Inali's
          </h1>
          <p className="mb-8 leading-relaxed">
            Bazar universal, donde encuentras todo lo que quieras en tecnología, abarrotes, y de todo un poco.
          </p>

          {/* Input de búsqueda */}
          <div className="flex w-full justify-center items-end">
            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
              <label htmlFor="hero-field" className="leading-7 text-sm text-gray-400">
                Buscar
              </label>
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-pink-900 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="w-full flex flex-wrap justify-center">
          {filteredProducts.map(product => (
            <div key={product.id} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                    {product.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {product.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{product.description}</p>
                  <div className="flex items-center flex-wrap">
                    <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                      {product.price} USD
                    </span>
                    <button>Carrito</button>
                    <button onClick={() => navigate(`/product/${product.id}`)} className="text-pink-500 hover:text-pink-600 ml-auto">Ver detalle</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Inicio;
