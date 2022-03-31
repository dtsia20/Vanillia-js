const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const back = document.getElementById('back');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const songs = await res.json();

  showData(songs);
}
// Get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const songs = await res.json();

  showData(songs);
}
// Show song and artist in DOM
function showData(songs) {
  result.innerHTML = `
    <ul class="songs">
      ${songs.data
        .map(
          song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;

  if (songs.prev || songs.next) {
  
    more.innerHTML = `
      ${
        songs.prev
          ? `<button class="btn" onclick="getMoreSongs('${songs.prev}')">Prev</button>`
          : ''
      }
      ${
        songs.next
          ? `<button class="btn" onclick="getMoreSongs('${songs.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
}



// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

   if (data.error) {
        result.innerHTML = data.error;
   } else {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
  }

  more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});

