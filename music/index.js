import musiclist from './myMusics.js';
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const first_section = document.querySelector('.first_section');
const displayName = document.querySelector('.display_nameonplay');
const displayName2 = document.querySelector('.display_nameonplay2');
const songWrapper = document.querySelector('.songwrapper');
const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const tumbnail_img = document.querySelector('.tumbnail_img') ;
const theArray = musiclist.myMusics;

const audioPlayer = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let isDragging = false;

const timeFormat = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const updateProgress = () => {
    if (audioPlayer.duration) {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${percentage}%`;
        currentTimeDisplay.textContent = timeFormat(audioPlayer.currentTime);
        durationDisplay.textContent = timeFormat(audioPlayer.duration);
    }
};
const seekTo = (e) => {
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - progressBarRect.left;
    const percentage = clickPosition / progressBarRect.width;
    const seekTime = percentage * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
};

const playSong = (e) => {
    currentSongIndex = e;
    const song = theArray[e];
    audioPlayer.src = song.song;
    audioPlayer.play();
    isPlaying = true;

    play.classList.add('hidden');
    pause.classList.remove('hidden');
    tumbnail_img.src = song.image;
    displayName.textContent = `${song.name} { ${song.artist} }`;
    displayName2.textContent = `${song.name} { ${song.artist} }`;
    
    console.log(tumbnail_img.src);
    const allSongs = document.querySelectorAll('.songwrapper');

    allSongs.forEach((songDiv, i) => {
        if (i === e) {
            songDiv.classList.add('bg-[#024CAA]');
            songDiv.classList.add('text-[#DBD3D3]');
            songDiv.classList.remove('bg-purple-200');
            
        } else {
            songDiv.classList.remove('bg-purple-300');
            songDiv.classList.remove('text-[#DBD3D3]');
            songDiv.classList.add('bg-purple-200');
        }
    });
};

const togglePlayPause = () => {
    if (isPlaying) {
        audioPlayer.pause();
        play.classList.remove('hidden');
        pause.classList.add('hidden');
    } else {
        audioPlayer.play();
        play.classList.add('hidden');
        pause.classList.remove('hidden');
    }
    isPlaying = !isPlaying;
};


const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % theArray.length;
    playSong(nextIndex);
};

const playPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + theArray.length) % theArray.length;
    playSong(prevIndex);
};

const createSongElement = (song, index) => {
    // const songWrapper = document.createElement('div');
    // songWrapper.className = "songwrapper navdiv bg-[#DBD3D3] text-[#091057] rounded-md align-middle flex gap-5 items-center px-3 py-[0.15rem] hover:text-[#DBD3D3] cursor-pointer hover:bg-[#024CAA] transition-colors";
    const songWrapper = document.createElement('div');
    songWrapper.className = "songwrapper navdiv bg-purple-200 hidden rounded-md align-middle sm:flex gap-5 items-center px-3 py-[0.15rem] cursor-pointer hover:text-[#DBD3D3] hover:bg-[#024CAA]  transition-colors";
    
    const img = document.createElement('img');
    img.className = " bg-green-400 rounded-2xl w-11 h-11";
    img.src = song.image;
    img.alt = 'img';
    
    const hr = document.createElement('hr');
    hr.className = "bg-[#091057] h-10 w-px";
    
    const artistSongWrapper = document.createElement('div');
    const mName = document.createElement('p');
    mName.className = "font-popping font-bold text-sm";
    mName.textContent = song.name;
    
    const aName = document.createElement('p');
    aName.className = "italic font-popping text-[0.6rem]";
    aName.textContent = song.artist;
    
    songWrapper.appendChild(img);
    songWrapper.appendChild(hr);
    songWrapper.appendChild(artistSongWrapper);
    artistSongWrapper.appendChild(mName);
    artistSongWrapper.appendChild(aName);
    
    
    songWrapper.addEventListener('click', () => playSong(index));
    
    return songWrapper;
};


theArray.forEach((song, index) => {
    const songElement = createSongElement(song, index);
    first_section.appendChild(songElement);
});


play.addEventListener("click", togglePlayPause);
pause.addEventListener("click", togglePlayPause);
forward.addEventListener("click", playNext);
backward.addEventListener("click", playPrevious);
audioPlayer.addEventListener('ended', playNext);
progressBar.addEventListener('click', seekTo); 
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', updateProgress);

progressBar.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        seekTo(e);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// document.addEventListener('keydown', (e) => {
//     switch(e.code) {
//         case 'Space':
//             e.preventDefault();
//             togglePlayPause();
//             break;
//         case 'ArrowRight':
//             playNext();
//             break;
//         case 'ArrowLeft':
//             playPrevious();
//             break;

//     }
// });
