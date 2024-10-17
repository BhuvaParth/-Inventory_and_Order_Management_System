import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart)); 
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{item.productName}</h3>
              <p className="text-gray-600 mb-2">Available Stock: {item.availableStock}</p>
              <p className="text-gray-600 mb-2">Price: ${item.price}</p>
              <p className="text-gray-600 mb-2">Order Status: {item.orderStatus}</p>
              <p className="text-gray-600 mb-2">Description: {item.description}</p>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <button 
          onClick={() => navigate('/placeorder')}
          className="mt-6 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600"
        >
          Place Order
        </button>
      )}
    </div>
  );
}
