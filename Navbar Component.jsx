import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-tcnj-blue text-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <i className="fas fa-graduation-cap mr-2"></i> Degree Planner
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-tcnj-blue md:bg-transparent p-4 md:p-0`}>
          <Link to="/" className="block md:inline-block hover:text-tcnj-gold">Home</Link>
          <Link to="/planner" className="block md:inline-block hover:text-tcnj-gold">Planner</Link>
          {token ? (
            <button onClick={handleLogout} className="block md:inline-block hover:text-tcnj-gold">Logout</button>
          ) : (
            <>
              <Link to="/login" className="block md:inline-block hover:text-tcnj-gold">Login</Link>
              <Link to="/register" className="block md:inline-block hover:text-tcnj-gold">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
