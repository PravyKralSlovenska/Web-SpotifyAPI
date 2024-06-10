import React, { useEffect } from 'react';

function SearchBody() {
  const resultsDiv = document.getElementById('results');
  
  function get_sessionStorage()
  {    
    // z session storage (premenna prehliadaca) si vytiahneme searchResults a searchType
    let searchResults = sessionStorage.getItem('searchResults');
    let searchType = sessionStorage.getItem('searchType');

    // ak v session storage nic nie je, tak sa nieco pokazilo a vratime sa :)
    if (!searchResults || !searchType) {
      console.log("error v get_sessionStorage");
      return;
    }

    // ak v session storage predsa len nieco tak to prevedieme na JSON a ziskame itemy
    searchResults = JSON.parse(searchResults);

    console.log(searchResults, searchType)
    
    try {
      searchResults = searchResults[searchType].items;
    } catch (error) {
      searchResults = [];
      console.error('Error getting search results');
      return;
    }

    // vraticame itemy
    return searchResults;
  }

  // funkcia na zobrazenie vysledkov
  function displayResults() {
    let results = get_sessionStorage();
    let searchType = sessionStorage.getItem('searchType');

    resultsDiv.innerHTML = '';

    // nejake styly pre vysledky
    resultsDiv.style.display = 'grid';
    resultsDiv.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    resultsDiv.style.gap = '20px';
    resultsDiv.style.justifyItems = 'center';
    resultsDiv.style.textAlign = 'center';
    resultsDiv.style.margin = '16px';

    // ak results alebo searchType neexistuju, tak sa nieco pokazilo a vratime sa znova :D
    if (!results || !searchType) {
      console.log("error v displayResults");
      return;
    }

    if (results.length === 0) {
      resultsDiv.innerHTML = '<h2>No results found</h2>';
      return;
    }

    // pre kazdy vysledok vytvorime div a pridame ho do resultsDiv
    results.forEach((result) => {
      const underDiv = document.createElement('div');
      let content = '';

      const imageStyle = 'width: 200px; height: 200px; object-fit: cover;';

      // podla typu vysledku vytvorime obsah divu
      switch (searchType) {
        case 'artists':
          content = `
            <div style="width: 200px; height: 200px; overflow: hidden;">
              <img src="${result.images[0]?.url || 'default-artist-image.png'}" alt="${result.name}" style="${imageStyle}">
            </div>
            <h3>${result.name}</h3>
            <p><a href="${result.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>
          `;
          break;
        case 'albums':
          content = `
            <div style="width: 200px; height: 200px; overflow: hidden;">
              <img src="${result.images[0]?.url || 'default-album-image.png'}" alt="${result.name}" style="${imageStyle}">
            </div>
            <h3>${result.name}</h3>
            <p>By ${result.artists.map(artist => artist.name).join(', ')}</p>
            <p><a href="${result.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>
          `;
          break;
        case 'tracks':
          content = `
            <h3>${result.name}</h3>
            <p>By ${result.artists.map(artist => artist.name).join(', ')}</p>
            <p>From the album: ${result.album.name}</p>
            <p><a href="${result.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>
          `;
          break;
        case 'playlists':
          content = `
            <div style="width: 200px; height: 200px; overflow: hidden;">
              <img src="${result.images[0]?.url || 'default-playlist-image.png'}" alt="${result.name}" style="${imageStyle}">
            </div>
            <h3>${result.name}</h3>
            <p>By ${result.owner.display_name}</p>
            <p><a href="${result.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>
          `;
          break;
        case 'users':
          content = `
            <div style="width: 200px; height: 200px; overflow: hidden;">
              <img src="${result.images[0]?.url || 'default-user-image.png'}" alt="${result.display_name}" style="${imageStyle}">
            </div>
            <h3>${result.display_name}</h3>
            <p><a href="${result.external_urls.spotify}" target="_blank">Listen on Spotify</a></p>
          `;
          break;
          
        default:
          console.log("Nieco sa dojebalo");
          return;
      }

      underDiv.innerHTML = content;
      underDiv.style.cursor = 'pointer';
      underDiv.style.transition = 'transform 0.3s ease';
      underDiv.style.margin = '10px';

      // ked na divko kliknes tak sa otvori spotify stranka
      underDiv.addEventListener('click', () => {
        window.open(result.external_urls.spotify, '_blank');
      });

      // hover animacie :3
      underDiv.addEventListener('mouseenter', () => {
        if (underDiv.querySelector('img')) {
          underDiv.querySelector('img').style.transform = 'scale(1.05)';
        }
      });

      underDiv.addEventListener('mouseleave', () => {
        if (underDiv.querySelector('img')) {
          underDiv.querySelector('img').style.transform = 'scale(1)';
        }
      });

      resultsDiv.appendChild(underDiv);
    });
}

  useEffect(() => {
    get_sessionStorage();
    displayResults();
  }, []);

  // debug button
  function debug() 
  {
    let searchResults = sessionStorage.getItem('searchResults');
    let searchType = sessionStorage.getItem('searchType');
    let query = sessionStorage.getItem('query');

    console.log(searchResults, searchType, query);
  }

  return (
    // the div needs to be big as the screen
    <div className='min-h-screen'>
      <h1 className='text-5xl font-Aeonik-bold block mt-20 px-6'>Search Results</h1>
      <div id="results"></div>
      <button className="bg-black text-white py-2 px-6 rounded p-5" onClick={debug}>debug button</button>
    </div>
  );
}

export default SearchBody;
