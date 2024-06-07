import React, { useState, useRef, useEffect } from 'react';
import SearchField from "./SearchField";

// neviem preco som volal ten searchbar SearchField, ale to je uz jedno :DDD

function Navbar() {
  // search field sa zobrazi len ked je isSearchVisible true
  const [isSearchVisible, setSearchVisible] = useState(false);
  // referencia je potrebna na zistenie ci sa kliklo mimo search fieldu
  const searchRef = useRef(null);

  // zavretie search fieldu ked sa klikne mimo neho
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

  // po stlaceni search buttonu sa zobrazi search field
  const handleSearchButtonClick = () => {
    setSearchVisible(true);
  };

  return (
    <>
      <header className="text-xl bg-black fixed top-0 left-0 right-0 z-10">
        <nav className="container mx-auto flex items-center py-5">
          <img src="/rytmus-image.png" alt="website logo" a="./index.html" className="" width={30} height={30}/>
          {/* Nazov stranky!!! Treba este vymysliet */}
          <h1 className="ml-2 font-Aeonik cursor-pointer" onClick={() => window.location.href = 'index.html'}>KurvaHosiGutenTag</h1>
          <ul className="flex ml-auto">
            <li className="ml-5">
              <button onClick={handleSearchButtonClick} className="bg-white font-Aeonik-bold transition-colors duration-100 hover:bg-gradient-to-r from-MojaZlta to-MojaRuzova text-transparent bg-clip-text">Search</button>
            </li>
            <li className="ml-5">
              <button>Log In</button>
            </li>
            <li className="ml-5 text-ellipsis">
              <button className="text-black bg-MojaZlta rounded ">Sign Up</button>
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
