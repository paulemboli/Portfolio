var audio = document.getElementById("audio1");
// var songTime = document.getElementById("songTime");
var newTrack = document.getElementById("newTrack");
var playButton = document.getElementById("playBtn");
var preButton = document.getElementById("prevBtn");
var nextButton = document.getElementById("nextBtn");
// var ranButton =  document.getElementById("random");
// var spotLink = document.getElementById("spotLink");

var jukebox = {
  tracks:['bensound-buddy.mp3','bensound-cute.mp3'],
  curr:0,
  playIt: function () {
    audio.play();
  },

  stopIt: function(){
    audio.pause();
  },
  next: function(){
  jukebox.stopIt()
  console.log(this.curr)
  this.curr= (this.curr + 1)%jukebox.tracks.length
  console.log(this.curr)
  audio.setAttribute('src',this.tracks[this.curr])
  jukebox.playIt()
  },
  prev: function(){
  jukebox.stopIt()
  console.log(this.curr)
  this.curr= (this.curr - 1)%jukebox.tracks.length
  if (this.curr < 0) this.curr = jukebox.tracks.length-1
  console.log(this.curr)
  audio.setAttribute('src',this.tracks[this.curr])
  jukebox.playIt()
},

  addTrack: function (){
    this.tracks.push(newTrack.value)

  }





}
