// client credentials
const clientID = '62f808e87402408b9bcb42e3684b1c10';
const clientSecret = 'ca5ae99bcdfd4905a10b4bae10f5fa7b';

// tato async funkcia ziska token z Spotify API cez client credentials
async function getToken(){
    let spotify_token_url = 'https://accounts.spotify.com/api/token';
    let response_json = await fetch(spotify_token_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(clientID + ':' + clientSecret).toString('base64')), //base64 encoding
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

// token
// console.log(await getToken());

// tato async funkcia ziska informacie o profile z Spotify API
// NEFUNGUJE - treba opravit, neviem preco nefunguje ale 100% to bude ten link vo fetchi
async function getProfile(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + accessToken }
    });
  
    return await response.json();
}

async function getTrackInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + access_token }
    });
  
    return await response.json();
}

async function getAlbumInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK", {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + access_token }
    });
  
    return await response.json();
}

async function getArtistInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF", {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + access_token }
    });
  
    return await response.json();
}

async function getSongInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT", {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + access_token }
    });
  
    return await response.json();
}

async function getPlaylistInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M", {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + access_token }
    });
  
    return await response.json();
}

async function getUserInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/users/paulinka", {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + access_token }
    });
  
    return await response.json();
}

// ziskanie tokenu a nasledne ziskanie dalsich informacii
getToken().then(response => {
    // // tracky
    // getTrackInfo(response).then(profile => {
    //     console.log(profile);
    // });

    // // profil
    // getProfile(response).then(profile => {
    //     console.log(profile);
    // });

    // album
    getAlbumInfo(response).then(profile => {
        console.log(profile);
    });

    // // artist
    // getArtistInfo(response).then(profile => {
    //     console.log(profile);
    // });

    // // song
    // getSongInfo(response).then(profile => {
    //     console.log(profile);
    // });

    // // playlist
    // getPlaylistInfo(response).then(profile => {
    //     console.log(profile);
    // });

    // // user
    // getUserInfo(response).then(profile => {
    //     console.log(profile);
    // });
});
