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

  const clientID = '62f808e87402408b9bcb42e3684b1c10';
  const clientSecret = 'ca5ae99bcdfd4905a10b4bae10f5fa7b';
  const credentials = btoa(`${clientID}:${clientSecret}`);  //base64 encoding

// tato async funkcia ziska token z Spotify API cez client credentials
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
        body: new URLSearchParams({ 
            'grant_type': 'client_credentials'
        })
    });

    // ak je response/odpoved OK, tak len ziskame token
    if (response_json.ok) {
        let data = await response_json.json();
        // console.log(data)
        let accessToken = data.access_token;
        // console.log(accessToken);
        return accessToken;
    } else {
        console.error('Failed to get access token');
        return null;
    }
  }

  async function handleSearch() {
    const accessToken = await getToken();
    const searchTypeMap = {
      artists: 'artist',
      // users: 'user', // netusim preco nejde fr
      tracks: 'tracks',
      playlists: 'playlist',
      genres: '', // neda sa vyhladavat
      albums: 'album'
    };
  
    const mappedSearchType = searchTypeMap[searchType];
    if (!mappedSearchType){
      console.error('Unsupported search type:', searchType);
      window.alert('Please choose a search type');
      return;
    }

    // if statement to check if the input box is not empty
    if (query === '') {
      window.alert('Please enter a search query');
      return;
    }
  
    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${mappedSearchType}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const searchData = await searchResponse.json();

    // console.log(searchData);
  
    // Store search results in sessionStorage
    sessionStorage.setItem('searchResults', JSON.stringify(searchData)); // JSON.stringify() converts a JavaScript object or value to a JSON string
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('searchType', searchType);
    sessionStorage.setItem('query', query);
    
    // let idk = sessionStorage.getItem('searchResults');
    // idk = JSON.parse(idk);
    // console.log(idk);

    // Open the new window with results.html
    // Redirect to searchResults.html in the same tab
    window.location.href = 'searchResults.html';
  };

  return (
    <div className="flex flex-col items-center bg-black rounded-lg border-b-2 border-b-MojaZlta p-4">
      <hr className="border-t-2 border-MojaZlta" />
      <table>
        <thead>
          <h2 className="float-left font-Aeonik-bold text-4xl px-4 py-2">Searching for: </h2>
        </thead>
        <tbody className="flex items-center">
          <select
            name="typ"
            id="typ"
            onChange={handleSearchTypeChange}
            className="bg-black text-white m-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500"
          >
            <option value="Choose an option" className="">Choose an option</option>
            <option value="artists">Artists</option>
            <option value="albums">Albums</option>
            <option value="tracks">Tracks</option>
            <option value="playlists" className="">Playlists</option>
            {/* <option value="users">Users</option> */}
          </select>
          <input
            type="text"
            placeholder={searchType ? `Searching for ${searchType}` : "Choose an option first"}
            value={query}
            onChange={handleQueryChange}
            className="bg-black text-white mx-4 px-2 py-1 w-64 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white mx-4 px-4 py-1 border-b-2 border-gray-300 hover:border-violet-500 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Search
          </button>
        </tbody>
      </table>
      <hr className="border-t-2 border-MojaZlta" />
    </div>
  );
}

export default SearchField;
