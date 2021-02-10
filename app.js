// const searchSongs = () => {
//   const searchText = document.getElementById("search-field").value;
//   const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
//   //Load data
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => displaySongs(data.data))
//     .catch(error => displayError("Sorry! didn't match any result with this keyword!"))
// };

const searchSongs = async () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
  //Load data
  try {
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
  } catch (error) {
    displayError("sorry don't match your search result!");
  }
};

const displaySongs = (songs) => {
  console.log(songs);
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = " ";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3";
    songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `;
    songContainer.appendChild(songDiv);
  });
};

// const getLyrics = (artist, title) => {
//   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => displayLyrics(data.lyrics));
// };

const getLyrics = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
  } catch (error) {
    displayError("Sorry don't match your search result!");
  }
};

const displayLyrics = (lyrics) => {
  const lyricsContainer = document.getElementById("lyrics-container");
  lyricsContainer.innerText = lyrics;
};

const displayError = (error) => {
  const errorTag = document.getElementById("error-tag");
  errorTag.innerText = error;
};
