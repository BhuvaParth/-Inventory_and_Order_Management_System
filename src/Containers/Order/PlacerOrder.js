import React, { useState } from 'react';

export default function PlaceOrder() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card', 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = [...existingOrders, formData];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName" 
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Shipping Address</label>
          <textarea 
            id="address" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Payment Method</label>
          <select 
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
