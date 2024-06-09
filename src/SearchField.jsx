import React, { useState } from 'react';

function SearchField() {
  const [searchType, setSearchType] = useState('');
  const [query, setQuery] = useState('');

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // Spotify API credentials, ktore pouzivam v getToken() funkcii, aby som ziskal token
  const clientID = '62f808e87402408b9bcb42e3684b1c10';
  const clientSecret = 'ca5ae99bcdfd4905a10b4bae10f5fa7b';

  const credentials = btoa(`${clientID}:${clientSecret}`);

  // funkcia mi vrati token, ktory potrebujem na overenie
  async function getToken(){
    let spotify_token_url = 'https://accounts.spotify.com/api/token';
    let response_json = await fetch(spotify_token_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      },
      // body: {...} sluzi na autentifikaciu/overenie
      // UrlSearchParams sluzi na vytvorenie URL query string, a to je to co sa posiela na server
      body: new URLSearchParams({ 'grant_type': 'client_credentials' })
    });

    if (response_json.ok) {
      let data = await response_json.json();
      let accessToken = data.access_token;
      return accessToken;
    } else {
      console.error('nepodarilo sa ziskat token, status:', response_json.status);
      return null;
    }
  }

  // funkcia, ktora sa stara o vyhladavanie
  async function handleSearch() {
    const accessToken = await getToken();
    const searchTypeMap = {
      artists: 'artist',
      tracks: 'tracks',
      playlists: 'playlist',
      albums: 'album'
    };
  
    const mappedSearchType = searchTypeMap[searchType];
    // ak sa nezhoduje searchType s nejakym typom, tak vypiseme chybu
    if (!mappedSearchType){
      console.error('Unsupported search type:', searchType);
      window.alert('Please choose a search type');
      return;
    }
    
    // query/dopyt nemoze byt prazdny
    if (query === '') {
      window.alert('Please enter a search query');
      return;
    }
    
    // ziskame vysledky vyhladavania, ked teda uz mame token a query a searchType mozme zavolat fetch, ktory nam vrati json]
    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${mappedSearchType}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const searchData = await searchResponse.json();

    // ulozim si vysledky do sessionStorage, aby som ich mohol zobrazit na dalsej stranke
    sessionStorage.setItem('searchResults', JSON.stringify(searchData));
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('searchType', searchType);
    sessionStorage.setItem('query', query);

    window.location.href = 'searchResults.html';
  };

  return (
    <div className="flex flex-col items-center bg-black rounded-lg border-b-2 border-b-MojaZlta p-4 max-w-full sm:max-w-2xl mx-auto">
      <h1 className='font-Aeonik-bold text-4xl text-left'>Searching for: </h1>
      <div className="w-full flex flex-col sm:flex-row items-center">
        <select
          name="typ"
          id="typ"
          onChange={handleSearchTypeChange}
          className="bg-black text-white m-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500"
        >
          <option value="Choose an option">Choose an option</option>
          <option value="artists">Artists</option>
          <option value="albums">Albums</option>
          <option value="tracks">Tracks</option>
          <option value="playlists">Playlists</option>
        </select>
        <input
          type="text"
          placeholder={searchType ? `Searching for ${searchType}` : "Choose an option first"}
          value={query}
          onChange={handleQueryChange}
          className="bg-black text-white mx-4 px-2 py-1 w-full sm:w-64 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white mx-4 px-4 py-1 border-b-2 border-gray-300 hover:border-violet-500 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Search
        </button>
      </div>
      <hr className="border-t-2 border-MojaZlta" />
    </div>
  );
}

export default SearchField;
