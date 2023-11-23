const body = document.querySelector("body")
const mode = document.querySelector(".playlist-left")
const playlist_right = document.querySelector(".playlist-right")
const list = document.querySelector(".list")
const music_img = document.querySelector(".music_img")
const song_title = document.querySelector(".song_title")
const prev_btn = document.querySelector(".prev_btn")
const play_btn = document.querySelector(".play_btn")
const next_btn = document.querySelector(".next_btn")
const audio = document.querySelector(".audio")
const running = document.querySelector(".song-slider_move")
const time1 = document.querySelector(".time1")
const time2 = document.querySelector(".time2")
const songSlider = document.querySelector("#song-slider")
const volumeSlider = document.querySelector("#volume-slider")
const repeat = document.querySelector(".repeat")

const musics = [
  "Let me Down",
  "Callin U",
  "Only You",
  "Ti i ya"
]

musics.forEach((item, i) => {
  list.innerHTML += `
  <h3 onclick="selectMusic(${i})">${item}</h3>
  `
})

const selectMusic = (id) => {
  loadMusic(id)
  playMusic()
  play_btn.setAttribute("src", "./images/pause-btn.png")
  list.classList.remove("activeList")
}

var index = 0

const loadMusic = (id) => {
  if (localStorage.getItem("musicIndex")) {
    music_img.setAttribute("src", `./imgs/${musics[localStorage.getItem("musicIndex")]}.jpg`)
    song_title.textContent = musics[localStorage.getItem("musicIndex")]
    audio.setAttribute("src", `./musics/${musics[localStorage.getItem("musicIndex")]}.mp3`)
  }else {
    music_img.setAttribute("src", `./imgs/${musics[id]}.jpg`)
    song_title.textContent = musics[id]
    audio.setAttribute("src", `./musics/${musics[id]}.mp3`)
  }
}

loadMusic(index)

const playMusic = () => {
  audio.play()
  music_img.classList.add("active")
  play_btn.setAttribute("src", "./images/pause-btn.png")
}

const pauseMusic = () => {
  audio.pause()
  music_img.classList.remove("active")
  play_btn.setAttribute("src", "./images/play.png")
}
play_btn.addEventListener("click", () => {
  if (music_img.classList.contains("active")) {
    pauseMusic()
  } else {

    playMusic()
  }
})

const prevMusic = () => {
  localStorage.clear()
  index --;
  if (index < 0) {
    index = musics.length - 1;
  }
  loadMusic(index)
  playMusic()
  play_btn.setAttribute("src", "./images/pause-btn.png")
}
const nextMusic = () => {
  index ++;
  if (index > musics.length - 1) {
    index = 0;
  }
  loadMusic(index)
  playMusic()
  play_btn.setAttribute("src", "./images/pause-btn.png")
}

prev_btn.addEventListener("click", prevMusic)
next_btn.addEventListener("click", () => {
  localStorage.clear()
  nextMusic()
})

playlist_right.addEventListener("click", () => {
  list.classList.toggle("activeList")
})

const progress = (e) => {
  const duration = e.srcElement.duration

  const curTime = e.srcElement.currentTime

  var musicProgress = (curTime * 100) / duration

  running.style.width = `${musicProgress}%`


  var startMinutes = Math.floor(curTime / 60)

  var startSeconds = Math.floor(curTime - (startMinutes * 60))

  time1.textContent = `${startMinutes < 10 ? "0" + startMinutes : startMinutes}:${startSeconds < 10 ? "0" + startSeconds : startSeconds}`

  var musicMinutes = Math.floor(duration / 60)
  var musicSecond = Math.floor(duration - (musicMinutes * 60))

  if (musicMinutes || musicSecond) {
    time2.textContent = `${musicMinutes < 10 ? "0" + musicMinutes : musicMinutes}:${musicSecond < 10 ? "0" + musicSecond : musicSecond}`
  }else {
    time2.textContent = "00:00"
  }
}

const setProgress = (e) => {
  const sliderWidth = songSlider
  .clientWidth
  const clickPoint = e.offsetX
  const duration = audio.duration

  audio.currentTime = duration * clickPoint / sliderWidth
}

const setVolume = () => {
  audio.volume = volumeSlider.value / volumeSlider.max
}

audio.addEventListener("timeupdate", progress)
audio.addEventListener("ended", nextMusic)
songSlider.addEventListener("click", setProgress)
volumeSlider.addEventListener("input", setVolume)


repeat.addEventListener("click", () => {
  localStorage.setItem("musicIndex", index)
})

mode.addEventListener("click", () => {
  body.classList.toggle("active") 
})


document.addEventListener("keydown", (e) => {
  const key = e.key
  if(e.keyCode == 39) {
    nextMusic()
  }else if(e.keyCode == 37) {
    prevMusic()
  }else if(e.keyCode == 32 && play_btn.getAttribute("src") === "./images/play.png"){
    playMusic()
  }else if (e.keyCode == 32) {
    pauseMusic()
  }else if (e.ctrlKey == true && e.key == "m") {
    list.classList.toggle("activeList")
  }
})