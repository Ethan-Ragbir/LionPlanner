import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto pt-20">
      <h1 className="text-3xl font-bold text-tcnj-blue mb-6">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-tcnj-blue font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tcnj-gold"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-tcnj-blue font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tcnj-gold"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-tcnj-blue font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tcnj-gold"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-tcnj-gold text-tcnj-blue py-2 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
