'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});


/**
 * playlist
 */
const previousButton = document.getElementById("previous");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");
const playlistSongs = document.getElementById("playlist-songs");

const allSongs = [
    {
        id: 0,
        title: "Crying in the club",
        artist: "Camilla Cabello",
        duration: "3:36",
        src: "https://ia902303.us.archive.org/29/items/10-bad-things/13%20-%20Crying%20in%20the%20Club.mp3",
    },
    {
        id: 1,
        title: "Real Friends",
        artist: "Camilla Cabello",
        duration: "3:43",
        src: "https://ia802303.us.archive.org/29/items/10-bad-things/09%20-%20Real%20Friends.mp3",
    },
    {
        id: 2,
        title: "Teenage Dream",
        artist: "Katy Perry",
        duration: "4:08",
        src: "https://ia601205.us.archive.org/25/items/datpiff-mixtape-m5f938ae/07%20-%20Katy%20Perry%20-%20Teenage%20Dream.mp3",
    },
    {
        id: 3,
        title: "Bunyi Gitar",
        artist: "P Ramlee",
        duration: "3:14",
        src: "https://ia903007.us.archive.org/34/items/pramlee_201909/P%20Ramlee%20~%20Bunyi%20Gitar.mp3",
    },
    {
        id: 4,
        title: "I know what you did last summer",
        artist: "Camilla Cabello",
        duration: "3:43",
        src: "https://ia802303.us.archive.org/29/items/10-bad-things/15%20-%20I%20Know%20What%20You%20Did%20Last%20Summer.mp3",
    },
    {
        id: 5,
        title: "Chandelier",
        artist: "Sia",
        duration: "3:32",
        src: "https://ia902508.us.archive.org/29/items/yt-1s.com-sia-chandelier-lyrics/yt1s.com%20-%20Sia%20%20Chandelier%20Lyrics.mp3",
    },
    {
        id: 6,
        title: "All i ask",
        artist: "Adele",
        duration: "3:25",
        src: "https://archive.org/download/Hello_201906/All%20I%20Ask.mp3",
    },
    {
        id: 7,
        title: "Fire Meet Gasoline",
        artist: "SIA",
        duration: "3:52",
        src: "https://ia801008.us.archive.org/13/items/sia_20210624/Fire%20Meet%20Gasoline.mp3",
    },
    {
        id: 8,
        title: "Chasing Pavement",
        artist: "Adele",
        duration: "3:10",
        src: "https://dn720306.ca.archive.org/0/items/16-one-and-only/8%20Chasing%20Pavements.mp3",
    },
    {
        id: 9,
        title: "When we were young",
        artist: "Adele",
        duration: "2:43",
        src: "https://dn720306.ca.archive.org/0/items/16-one-and-only/1%20When%20We%20Were%20Young.mp3",
    },
];

const audio = new Audio();

let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

const playPreviousSong = () => {
    if (userData?.currentSong === null) return;
    else {
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData?.songs[currentSongIndex - 1];

        playSong(previousSong.id);
    }
};

const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;

    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData.songCurrentTime;
    }

    userData.currentSong = song;
    playButton.classList.add("playing");
    
    highlightCurrentSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
    audio.play();
};

const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;

    playButton.classList.remove("playing");
    audio.pause();
};

const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData?.songs[currentSongIndex + 1];

        playSong(nextSong.id);
    }
};

const shuffle = () => {
    userData?.songs.sort(() => Math.random() - 0.5);
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    renderSongs(userData?.songs);
    pauseSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
    if (userData?.currentSong?.id === id) {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
    }

    userData.songs = userData?.songs.filter((song) => song.id !== id);
    renderSongs(userData?.songs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();

    if (userData.songs.length === 0) {
        const resetButton = document.createElement("button");
        const resetText = document.createTextNode("Reset Playlist");

        resetButton.id = "reset";
        resetButton.ariaLabel = "Reset playlist";
        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);

        resetButton.addEventListener("click", () => {
            userData.songs = [...allSongs];
            renderSongs(userData?.songs);
            setPlayButtonAccessibleText();
            resetButton.remove();
        });
    }
};

const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    playingSong.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });

    if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
    const songsHTML = array
        .map((song) => {
            return `
            <li id="song-${song.id}" class="playlist-song">
                <button class="playlist-song-info" onclick="playSong(${song.id})">
                    <span class="playlist-song-title">${song.title}</span>
                    <span class="playlist-song-artist">${song.artist}</span>
                    <span class="playlist-song-duration">${song.duration}</span>
                </button>
                <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
                </button>
            </li>
            `;
        })
        .join("");

    playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0];

    playButton.setAttribute(
        "aria-label",
        song?.title ? `Play ${song.title}` : "Play"
    );
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData.currentSong);

previousButton.addEventListener("click", playPreviousSong);

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        playSong(userData?.currentSong.id);
    }
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);  

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
        playNextSong();
    } else {
        userData.currentSong = null;
        userData.songCurrentTime = 0;

        pauseSong();
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
    }
});

const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
    
        if (a.title > b.title) {
            return 1;
        }
    
        return 0;
    });
    return userData?.songs;
}

renderSongs(sortSongs());
setPlayButtonAccessibleText();
