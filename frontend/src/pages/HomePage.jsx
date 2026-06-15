import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Produkte:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Wird geladen...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Willkommen in unserem Online Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg p-4 hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
            <Link to={`/product/${product._id}`} className="bg-blue-600 text-white p-2 rounded block text-center">
              Details anschauen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
