import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const data = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users${endpoint}`, data);
      localStorage.setItem('token', response.data.token);
      alert(isLogin ? 'Erfolgreich angemeldet!' : 'Erfolgreich registriert!');
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto border rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isLogin ? 'Anmelden' : 'Registrieren'}
        </h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block font-bold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block font-bold mb-2">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-bold mb-2">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
          >
            {loading ? 'Wird verarbeitet...' : isLogin ? 'Anmelden' : 'Registrieren'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? 'Noch kein Konto?' : 'Bereits registriert?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 ml-2 underline"
          >
            {isLogin ? 'Registrieren' : 'Anmelden'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
