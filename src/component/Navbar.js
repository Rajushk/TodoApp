import React from 'react';
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = (props) => {
  const { theme, setTheme } = props;

  const themeHandler = () => {
    setTheme(prevTheme => !prevTheme); // Toggle theme state
  };

  return (
    <div className={`p-4 ${theme ? 'bg-blue-500' : 'bg-black text-white'} flex justify-between items-center`}>
      <div>
        <h1 className="text-2xl font-bold">To Do List</h1>
      </div>
      <div>
        <button
          onClick={themeHandler}
          className={`p-2 rounded-full transition-colors ${theme ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
        >
          {theme ? <FaSun /> : <FaMoon />} {/* Sun for light mode, Moon for dark mode */}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
