import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">
        Logo
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link to="/category" className="hover:bg-gray-700 p-2 rounded block">Category</Link>
          </li>
          {/* Add more <li> elements for additional links */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
