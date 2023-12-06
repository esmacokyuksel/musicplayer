
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");


let index;

let loop;

const songsList = [
  {
    name: "Şehadet Uykusu",
    link: "assets/AYKUT_KUŞKAYA_ŞEHADET_UYKUSU.mp3",
    artist: "Aykut Kuşkaya",
    image: "assets/aa_picture_20151210_7022850_high.jpg",
  },
  {
    name: "Bir Gün Gelir",
    link: "assets/Eşref_Ziya_Bir_Gün_Gelir.mp3",
    artist: "Eşref Ziya Terzi",
    image: "assets/pexels-bilakis-15545431.jpg",
  },
  {
    name: "Allahu Ekber",
    link: "assets/Grup_Yürüyüş_-_Allahu_Ekber.mp3",
    artist: "Grup Yürüyüş",
    image: "assets/pexels-rdne-stock-project-7249294.jpg",
  },
  {
    name: "Nasheed",
    link: "assets/nass.mp3",
    artist: "İslam Subhi",
    image: "assets/pexels-michael-burrows-7129744.jpg",
  },
  {
    name: "Güller Açmasa Da",
    link: "assets/UMUT_MÜRARE_GÜLLER_AÇMASA_DA.mp3",
    artist: "Umut Mürare",
    image: "assets/pexels-ömer-faruk-yıldız-7906532.jpg",
  },
  {
    name: "Bir Sabah Gelecek Kardan Aydınlık",
    link: "assets/ayd.mp3",
    artist: "Teymullah",
    image: "assets/WhatsApp Görsel 2023-12-07 saat 00.06.35_061d74ad.jpg" ,
  },
  {
    name: "Bir Güneş Doğuyor",
    link: "assets/EŞREF_ZİYA_BİR_GÜNEŞ_DOĞUYOR.mp3",
    artist: "Eşref Ziya Terzi",
    image: "assets/WhatsApp Görsel 2023-12-07 saat 00.06.56_853d9e4f.jpg",
  },
  {
    name: "Arzuhal",
    link: "assets/Arzuhal .mp3",
    artist: "Ömer Karaoğlu",
    image: "assets/Arzuhal.jpg",
  },
];


let events = {
  mouse: {
    click: "click",
  },
  touch: {
    click: "touchstart",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (error) {
    deviceType = "mouse";
    return false;
  }
};

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};



const setSong = (arrayIndex) => {
  
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration); //320
  };
  playListContainer.classList.add("hide");
  playAudio();
};


const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide"); 
  playButton.classList.add("hide"); 
};


repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("tekrar kapatildi");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("tekrar acik");
  }
});


const nextSong = () => {

  if (loop) {
    if (index == songsList.length - 1) {
      
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    console.log(randIndex);
    setSong(randIndex);
  }
  playAudio();
};

// sarkiyi durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

// onceki sarki
const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};


audio.onended = () => {
  nextSong();
};


shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("karistirma kapali");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("karistirma acik");
  }
});


playButton.addEventListener("click", playAudio);


nextButton.addEventListener("click", nextSong);


pauseButton.addEventListener("click", pauseAudio);


prevButton.addEventListener("click", previousSong);

isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
  
  let coordStart = progressBar.getBoundingClientRect().left;

  
  let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

 
  audio.currentTime = progress * audio.duration;

 
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});


setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);


audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

window.onload = () => {
  index = 0;
  setSong(index);
  initPlayList();
};

const initPlayList = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songsList[i].name}
            </span>
            <span id="playlist-song-album">
            ${songsList[i].artist}
            </span>
        </div>
        </li>
        `;
  }
};


playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});


closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});