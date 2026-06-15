import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p>Dein Warenkorb ist leer. <Link to="/" className="text-blue-600">Weiter einkaufen</Link></p>
      ) : (
        <>
          <table className="w-full border-collapse border mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Produkt</th>
                <th className="border p-2">Menge</th>
                <th className="border p-2">Preis</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <h2 className="text-2xl font-bold mb-4">Summe: ${totalPrice.toFixed(2)}</h2>
            <Link to="/checkout" className="bg-green-600 text-white p-3 rounded inline-block">
              Zur Kasse
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
