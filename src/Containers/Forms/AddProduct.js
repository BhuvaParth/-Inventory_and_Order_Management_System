import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [availableStock, setAvailableStock] = useState('');
  const [price, setPrice] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !availableStock || !price || !orderStatus || !description) {
      setError('All fields are required');
      return;
    }

    const newProduct = {
      productName,
      availableStock,
      price,
      orderStatus,
      description,
    };

    const storedProducts = localStorage.getItem('products');
    let products = [];
    if (storedProducts) {
      products = JSON.parse(storedProducts);
    }

    products.push(newProduct);

    localStorage.setItem('products', JSON.stringify(products));

    setProductName('');
    setAvailableStock('');
    setPrice('');
    setOrderStatus('');
    setDescription('');
    setError('');

    navigate('/admindashboard');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Available Stock</label>
          <input
            type="number"
            value={availableStock}
            onChange={(e) => setAvailableStock(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter available stock"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Order Status</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
          >
            <option value="">Select Order Status</option>
            <option value="InStock">InStock</option>
            <option value="OutStock">OutStock</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
