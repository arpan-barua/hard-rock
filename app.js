const searchSongs = () => {
  searchText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  toggleSpinner();
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySongs(data.data))
    .catch(error => displayError("Something went wrong! Please try again later!"))
};

const displaySongs = (songs) => {
  const songsContainer = document.getElementById("songs-container");
  songsContainer.innerHTML = '';
  songs.forEach((song) => {
    songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `  <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
        <source src="${song.preview}" type="audio/mpeg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`;
    songsContainer.appendChild(songDiv);
    toggleSpinner();
  });
};

const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    toggleSpinner();
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = lyrics => {
   const lyricsDiv = document.getElementById("lyrics-div");
    lyricsDiv.innerText = lyrics;
    toggleSpinner();
}

const displayError = error => {
    errorMessage = document.getElementById("error-message");
    errorMessage.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById("loading-spinner");
    spinner.classList.toggle("d-none");
    const songs = document.getElementById("songs-container");
    songs.classList.toggle("d-none");
    const lyrics = document.getElementById("lyrics-div");
    lyrics.classList.toggle("d-none");
}
