import React, { useEffect, useState } from 'react';

export default function YourOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders)); 
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{order.fullName}</h3>
              <p className="text-gray-600 mb-2">Email: {order.email}</p>
              <p className="text-gray-600 mb-2">Address: {order.address}</p>
              <p className="text-gray-600 mb-2">Payment Method: {order.paymentMethod}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
