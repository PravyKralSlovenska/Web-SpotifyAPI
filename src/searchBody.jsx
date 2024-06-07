import React, { useEffect } from 'react';

function SearchBody() {

  function get_sessionStorage()
  {    
    let searchResults = sessionStorage.getItem('searchResults');
    let searchType = sessionStorage.getItem('searchType');
    // let query = sessionStorage.getItem('query');

    searchResults = JSON.parse(searchResults);

    console.log(searchResults, searchType)
    
    searchResults = searchResults[searchType].items;
    return searchResults;
  }

  function displayResults() {
  let results = get_sessionStorage();
  let searchType = sessionStorage.getItem('searchType');

  let resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  // Adding styling for the results container to center items
  resultsDiv.style.display = 'grid';
  resultsDiv.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
  resultsDiv.style.gap = '20px';
  resultsDiv.style.justifyItems = 'center';
  resultsDiv.style.textAlign = 'center';
  resultsDiv.style.margin = '16px';

  if (!results || !searchType) {
    console.log("Nieco sa dojebalo");
    return;
  }

  results.forEach((result) => {
    const underDiv = document.createElement('div');
    let content = '';

    const imageStyle = 'width: 200px; height: 200px; object-fit: cover;';

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

    // Event listener to open a new page when the div is clicked
    underDiv.addEventListener('click', () => {
      window.open(result.external_urls.spotify, '_blank');
    });

    // Adding hover animation
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

  function debug() 
  {
    let searchResults = sessionStorage.getItem('searchResults');
    let searchType = sessionStorage.getItem('searchType');
    let query = sessionStorage.getItem('query');

    console.log(searchResults, searchType, query);
  }


  return (
    <>
      <h1 className='text-5xl font-Aeonik-bold block mt-20 px-6'>Search Results</h1>
      <div id="results"></div>
      <button className="bg-black text-white py-2 px-6 rounded p-5" onClick={debug}>debug button</button>
    </>
  );
}

export default SearchBody;
