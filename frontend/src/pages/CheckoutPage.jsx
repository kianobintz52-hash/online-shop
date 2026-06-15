import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    zip: '',
    country: '',
    paymentMethod: 'credit-card'
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        user: token,
        items: cartItems,
        totalPrice: totalPrice,
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Bestellung erfolgreich aufgegeben!');
    } catch (error) {
      alert('Fehler beim Aufgeben der Bestellung');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Kasse</h1>
      <div className="grid grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Lieferadresse</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Straße</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Stadt</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Postleitzahl</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Land</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-bold mb-2">Zahlungsart</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="credit-card">Kreditkarte</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Banküberweisung</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700"
          >
            {loading ? 'Wird verarbeitet...' : 'Bestellung abschließen'}
          </button>
        </form>
        <div className="border rounded-lg p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
          {cartItems.map(item => (
            <div key={item._id} className="mb-4 pb-4 border-b">
              <p className="font-bold">{item.name}</p>
              <p className="text-gray-600">Menge: {item.quantity}</p>
              <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <hr className="my-4" />
          <p className="text-2xl font-bold text-blue-600">Gesamt: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
