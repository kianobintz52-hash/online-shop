import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Fehler beim Laden des Produkts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 1 }
    });
    alert('Produkt zum Warenkorb hinzugefügt!');
  };

  if (loading) return <div className="text-center py-8">Wird geladen...</div>;
  if (!product) return <div className="text-center py-8">Produkt nicht gefunden</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="text-lg mb-4">Lagerbestand: {product.stock}</p>
          <p className="text-lg mb-8">⭐ Bewertung: {product.rating}/5</p>
          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-700"
            >
              In den Warenkorb
            </button>
          ) : (
            <p className="text-red-600 text-lg font-bold">Nicht verfügbar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
