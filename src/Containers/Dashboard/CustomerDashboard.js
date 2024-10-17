import React, { useEffect, useState } from 'react';

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts)); 
    }
  }, []);

  const addToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const productExists = cart.some((item) => item.productName === product.productName);

    if (!productExists) {
      cart.push(product); 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      alert(`${product.productName} added to the cart!`);
    } else {
      alert(`${product.productName} is already in the cart.`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
              <p className="text-gray-600 mb-2">Available Stock: {product.availableStock}</p>
              <p className="text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-gray-600 mb-2">Order Status: {product.orderStatus}</p>
              <p className="text-gray-600 mb-2">Description: {product.description}</p>

              <button 
                onClick={() => addToCart(product)} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
