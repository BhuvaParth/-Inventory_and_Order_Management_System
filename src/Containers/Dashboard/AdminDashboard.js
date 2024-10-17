import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); 
  };

  const handleEdit = (product, index) => {
    localStorage.setItem('editProduct', JSON.stringify({ ...product, index }));
    navigate('/editproduct'); 
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Available Stock</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Order Status</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">{product.availableStock}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.orderStatus}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product, index)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
