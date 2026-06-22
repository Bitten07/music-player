const songName = document.getElementById('song-name');
const singerName = document.getElementById('singer');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const cover = document.getElementById('cover');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffle = document.getElementById('shuffle');

let width = 0;
let clickPosition = 0;
let JumpToTime = 0;
let isShuffled = false;
let isPlaying = false;
let randomIndex = 0;
let auxIndex = 0;

// Objects
const meuPaiMeDisse = {
    songName : 'Meu pai me Disse',
    singer : 'Murisko',
    file : 'MeuPaiMeDisse'
};

const pombaDaPaz = {
    songName : 'Pomba da Paz',
    singer : 'Link do Zap',
    file: 'pombaDaPaz'
};

const monsterSkillet = {
    songName : 'Monster',
    singer : 'Skillet',
    file : 'monsterSkillet'
};

const playlist = [meuPaiMeDisse, pombaDaPaz, monsterSkillet];
let playlistSorted = [...playlist];
let index = 0;

// Functions
function playSong() {
    play.querySelector('.bi').classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `/images/${playlistSorted[index].file}.jpeg`;
    song.src = `/songs/${playlistSorted[index].file}.mp3`;
    songName.innerText = playlistSorted[index].songName
    singer.innerText = playlistSorted[index].singer;
}

function previousSong() {
    if (index === 0){
    index = playlistSorted.length - 1;
    initializeSong();
    playSong();
} else {
    index -= 1;
    initializeSong();
    playSong();
}
}

function nextSong() {
if (index === playlistSorted.length - 1){
    index = 0;
    initializeSong();
    playSong();
} else {
    index += 1;
    initializeSong();
    playSong();
}
}

function updateProgressBar() {
    const percentBar = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${percentBar}%`); 
}

function jumpTo(event) {
    width = progressContainer.clientWidth;
    clickPosition = event.offsetX;
    JumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = JumpToTime;
}

function shuffleArray(preshuffleArray) {
    let size = preshuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        auxIndex = preshuffleArray[currentIndex];
        preshuffleArray[currentIndex] = preshuffleArray[randomIndex];
        preshuffleArray[randomIndex] = auxIndex;
        currentIndex -= 1;
    }
}

function shuffleClick() {
    if (isShuffled === false) {
        isShuffled = true
        shuffleArray(playlistSorted)
        shuffle.classList.add('button-active')
    } else {
        isShuffled = false;
        playlistSorted = [...playlist];
        shuffle.classList.remove('button-active')
    }
}

// Initializing Functions
initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);

song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
shuffle.addEventListener("click", shuffleClick);