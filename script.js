const songName = document.getElementById('song-name');
const singerName = document.getElementById('singer-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');

songName.innerText = 'Meu pai me disse';
singerName.innerHTML = 'Murisko';

play.onclick(play(song));
