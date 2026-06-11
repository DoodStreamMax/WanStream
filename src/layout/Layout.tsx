import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { showSearch } = useLayout();

  useEffect(() => {
    fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          const safeTitle = `${data.title} - HD Stream`;
          document.title = safeTitle;

          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          const extract = data.extract ? data.extract.substring(0, 150) + '...' : `Watch ${data.title} secure streaming.`;
          metaDesc.setAttribute('content', extract);

          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', safeTitle);
        }
      })
      .catch(() => {
        document.title = `Watch Premium Stream ${Math.floor(Math.random() * 999999)}`;
      });
  }, [location.pathname, location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      navigate(`/search?search=${trimmedSearch}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800 fixed top-0 left-0 w-full p-4 text-white flex items-center justify-between shadow-lg z-50">
        <Link to="/" className="flex items-center flex-shrink-0">
          <FaPlayCircle className="mr-3 text-blue-400" size={24} />
          <h1 className="text-xl font-bold">Pro Stream</h1>
        </Link>
        
        {showSearch && (
          <div className="w-full max-w-sm ml-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search other videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-white">
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </header>

      <main className="flex-1 text-white pt-20">
        {children}
      </main>

      <footer className="bg-gray-800 p-4 text-white text-center">
        <p>© {new Date().getFullYear()} Pro Stream. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;