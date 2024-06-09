import React, { useState, useRef, useEffect } from 'react';
import SearchField from "./SearchField";

function Navbar() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchButtonClick = () => {
    setSearchVisible(true);
  };

  return (
    <>
      <header className="text-xl bg-black fixed top-0 left-0 right-0 z-10">
        <nav className="container mx-auto flex items-center justify-between py-5 px-6">
          <div className="flex items-center">
            <img src="/rytmus-image.png" alt="website logo" className="w-8 h-8" />
            <h1 className="ml-2 font-Aeonik cursor-pointer text-white" onClick={() => window.location.href = 'index.html'}>KurvaHosiGutenTag</h1>
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <button onClick={handleSearchButtonClick} className="bg-white font-Aeonik-bold transition-colors duration-100 hover:bg-gradient-to-r from-MojaZlta to-MojaRuzova text-transparent bg-clip-text">Search</button>
            </li>
          </ul>
        </nav>
        <hr className="border-t-2 border-MojaZlta" />
      </header>

      <div className="fixed top-20 left-0 right-0 z-20 flex justify-center" ref={searchRef}>
        {isSearchVisible && <SearchField />}
      </div>
    </>
  );
}

export default Navbar;
