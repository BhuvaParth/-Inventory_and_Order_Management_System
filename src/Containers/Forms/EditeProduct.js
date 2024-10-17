import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    availableStock: '',
    price: '',
    orderStatus: '',
    description: '',
  });
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem('editProduct');
    if (storedProduct) {
      const { index, ...productData } = JSON.parse(storedProduct);
      setProduct(productData);
      setIndex(index);
    }
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem('products'));
    storedProducts[index] = product;
    localStorage.setItem('products', JSON.stringify(storedProducts));
    localStorage.removeItem('editProduct');
    navigate('/admindashboard');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
        <div>
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Available Stock</label>
          <input
            type="number"
            name="availableStock"
            value={product.availableStock}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter available stock"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Order Status</label>
          <select
            name="orderStatus"
            value={product.orderStatus}
            onChange={handleChange}
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
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
