const main = document.querySelector(".main");
const list_music = document.querySelector(".list_music");

const biblioStruct = document.querySelector(".bibliotheque");
const playlistStruct = document.querySelector(".playlist");
const lecteurStruct = document.querySelector(".lecteur");

const playButton = document.querySelector(".play");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const barreLecture = document.querySelector(".barre");
const barre = document.querySelector(".fill");
const time = document.querySelector(".showTime");

const home = document.querySelector(".home");

const search = document.querySelector(".search");


document.addEventListener("DOMContentLoaded", function() {
    biblioStruct.classList.add("fadeIn");
    playlistStruct.classList.add("fadeIn");
    lecteurStruct.classList.add("fadeIn");
  });

home.addEventListener("click", function(){
  
  biblioStruct.style.opacity = getComputedStyle(biblioStruct).opacity;
  playlistStruct.style.opacity = getComputedStyle(playlistStruct).opacity;
  lecteurStruct.style.opacity = getComputedStyle(lecteurStruct).opacity;

  biblioStruct.classList.remove("fadeIn");
  playlistStruct.classList.remove("fadeIn");
  lecteurStruct.classList.remove("fadeIn");

  document.body.style.backgroundImage ="";
  song.pause();

  biblioStruct.classList.add("fadeOut");
  playlistStruct.classList.add("fadeOut");
  lecteurStruct.classList.add("fadeOut");

  setTimeout(function() {
    window.location = "./index.html";
  }, 1500);
});



search.addEventListener("keyup", function(e) {

  const searchString = e.target.value.toLowerCase();
  const songs = biblioStruct.querySelectorAll(".titre");
  Array.from(songs).forEach(function(song){
    const title = song.querySelector(".song").textContent;
    const artist = song.querySelector(".artist").textContent;
    if(title.toLowerCase().indexOf(searchString) != -1 || artist.toLowerCase().indexOf(searchString) != -1){
      song.style.display="block";
    }else{
      song.style.display="none";
    }
  })
});



  playButton.addEventListener("mouseover", playHover);
  playButton.addEventListener("click", playClick);
  document.body.addEventListener("keydown", function(e){
    if(e.keyCode==32){
      playClick();
    }
  });
  var etatPlay = false;
  var song = new Audio();
  var currentSong = 0;
  var onPause = false;

  function playHover(){

    playButton.classList.add("pause");
    playButton.style.transform = 'scale('+playButton.getBoundingClientRect().width/playButton.offsetWidth+')';
    playButton.classList.remove("dezoomHover");
    playButton.classList.remove("pause");
    playButton.classList.add("zoomHover");
    playButton.addEventListener("mouseout", playExit);
  }
  function playExit(){
    playButton.removeEventListener("mouseout", playExit);
    playButton.classList.add("pause");
    playButton.style.transform = 'scale('+playButton.getBoundingClientRect().width/playButton.offsetWidth+')';
    playButton.classList.remove("zoomHover");
    playButton.classList.remove("pause");
    playButton.classList.add("dezoomHover");
  }
  function playClick(){
    
    if(list_path_music.length!=0){
      if(!etatPlay){
        if(!onPause){
          song.src = "./Musique/Musique/"+list_path_music[currentSong]+ ".mp3";
          song.addEventListener("timeupdate", timeUpdate);
        }
        song.play();
        playButton.src = "./icon/pause.png";

        const titreOnPlay = playlist.querySelectorAll(".titre");
        for(let i = 0; i<titreOnPlay.length; i++){
          if(i == currentSong){
            titreOnPlay[i].classList.add("onPlay");
          }else{
            titreOnPlay[i].classList.remove("onPlay");
          }
          
        }
        document.body.style.backgroundImage= 'url("./Musique/fond/'+list_path_music[currentSong]+'.jpg")';
        etatPlay = true;
      }else{
        song.pause();
        playButton.src = "./icon/play.png";
        etatPlay = false;
        onPause = true;
        
      }
    }else{
      song.pause();
      song.removeEventListener("timeupdate", timeUpdate);
      song.src="";
      playButton.src = "./icon/play.png";
      document.body.style.backgroundImage= '';
      time.innerHTML = "--:--";
      barre.style.width = 0;
      etatPlay = false;
      onPause = false;
      
    }
  }

function timeUpdate(){
  var position = song.currentTime / song.duration;
  barre.style.width = position * 100 + "%";
  var timing = Math.floor(song.currentTime);
  var seconde = timing%60;
  var minute = Math.floor(timing/60);
  if(seconde<10){
    seconde = "0"+seconde;
  }
  if(minute<10){
    minute = "0"+minute;
  }
  time.innerHTML = minute+":"+seconde;
  if(position == 1){
    nextClick();
  }
}




  nextButton.addEventListener("mouseover", nextHover);
  nextButton.addEventListener("click", nextClick);
  function nextHover(){
    nextButton.classList.add("pause");
    nextButton.style.transform = 'scale('+nextButton.getBoundingClientRect().width/nextButton.offsetWidth+')';
    nextButton.classList.remove("dezoomHover");
    nextButton.classList.remove("pause");
    nextButton.classList.add("zoomHover");
    nextButton.addEventListener("mouseout", nextExit);
  }
  function nextExit(){
    nextButton.removeEventListener("mouseout", nextExit);
    nextButton.classList.add("pause");
    nextButton.style.transform = 'scale('+nextButton.getBoundingClientRect().width/nextButton.offsetWidth+')';
    nextButton.classList.remove("zoomHover");
    nextButton.classList.remove("pause");
    nextButton.classList.add("dezoomHover");
  }
  function nextClick(){
    currentSong++;

    if(currentSong > list_path_music.length-1){
      currentSong = 0;
    }
    etatPlay = false;
    onPause = false;
    playClick();
  }




  previousButton.addEventListener("mouseover", previousHover);
  previousButton.addEventListener("click", previousClick);
  function previousHover(){
    previousButton.classList.add("pause");
    previousButton.style.transform = 'scale('+previousButton.getBoundingClientRect().width/previousButton.offsetWidth+')';
    previousButton.classList.remove("dezoomHover");
    previousButton.classList.remove("pause");
    previousButton.classList.add("zoomHover");
    previousButton.addEventListener("mouseout", previousExit);
  }
  function previousExit(){
    previousButton.removeEventListener("mouseout", previousExit);
    previousButton.classList.add("pause");
    previousButton.style.transform = 'scale('+previousButton.getBoundingClientRect().width/previousButton.offsetWidth+')';
    previousButton.classList.remove("zoomHover");
    previousButton.classList.remove("pause");
    previousButton.classList.add("dezoomHover");
  }
  function previousClick(){
    currentSong--;

    if(currentSong < 0){
      currentSong = list_path_music.length-1;
    }
    etatPlay = false;
    onPause = false;
    playClick();
  }

barreLecture.addEventListener("click", function(e){
  var timePoositionCurseur = (e.clientX-barreLecture.getBoundingClientRect().left) / barreLecture.getBoundingClientRect().width * song.duration;
  song.currentTime = timePoositionCurseur;
});



  // titre section


  const playlist = document.querySelector(".containerPlaylist");
  const titre = document.querySelectorAll(".titre");
  const titre1 = document.querySelector(".titre1");
  const titre2 = document.querySelector(".titre2");
  const titre3 = document.querySelector(".titre3");
  const titre4 = document.querySelector(".titre4");
  const titre5 = document.querySelector(".titre5");
  const titre6 = document.querySelector(".titre6");
  const titre7 = document.querySelector(".titre7");
  const titre8 = document.querySelector(".titre8");
  const titre9 = document.querySelector(".titre9");
  const titre10 = document.querySelector(".titre10");

  const drop = document.querySelector(".drop");

  var etatClick = false;
  var etatPlaylist = false;
  var elmRect = {h: 0, w:0,l:0};
  var list_path_music = [];
  var onPlayVerificationClass = false;


  for (let i = 0; i < titre.length; i++){
      let item = titre[i];
      item.addEventListener("mouseover", (e) => { titreHover(e, item);});
      item.addEventListener("mouseout", (e) => { titreExit(e, item);});
  }

  

  titre1.addEventListener("mousedown", (e) => { titreClick(e, titre1);});
  titre1.addEventListener("mouseup", (e) => { titreRelacher(e, titre1);});
  
  
  titre2.addEventListener("mousedown", (e) => { titreClick(e, titre2);});
  titre2.addEventListener("mouseup", (e) => { titreRelacher(e, titre2);});
  
  titre3.addEventListener("mousedown", (e) => { titreClick(e, titre3);});
  titre3.addEventListener("mouseup", (e) => { titreRelacher(e, titre3);});

  titre4.addEventListener("mousedown", (e) => { titreClick(e, titre4);});
  titre4.addEventListener("mouseup", (e) => { titreRelacher(e, titre4);});

  titre5.addEventListener("mousedown", (e) => { titreClick(e, titre5);});
  titre5.addEventListener("mouseup", (e) => { titreRelacher(e, titre5);});

  titre6.addEventListener("mousedown", (e) => { titreClick(e, titre6);});
  titre6.addEventListener("mouseup", (e) => { titreRelacher(e, titre6);});

  titre7.addEventListener("mousedown", (e) => { titreClick(e, titre7);});
  titre7.addEventListener("mouseup", (e) => { titreRelacher(e, titre7);});

  titre8.addEventListener("mousedown", (e) => { titreClick(e, titre8);});
  titre8.addEventListener("mouseup", (e) => { titreRelacher(e, titre8);});

  titre9.addEventListener("mousedown", (e) => { titreClick(e, titre9);});
  titre9.addEventListener("mouseup", (e) => { titreRelacher(e, titre9);});

  titre10.addEventListener("mousedown", (e) => { titreClick(e, titre10);});
  titre10.addEventListener("mouseup", (e) => { titreRelacher(e, titre10);});


  function titreHover(e, item){
    if(!etatClick)
      item.style.backgroundColor = "rgb(115, 155, 255)";
  }

  function titreExit(e, item){
    if(!etatClick)
      item.style.backgroundColor = "rgb(97, 97, 97)";
  }

  function titreClick(e, element){
      onPlayVerificationClass = element.classList.contains("onPlay");
      if(onPlayVerificationClass){
        element.classList.remove("onPlay");
      }
      element.addEventListener("mousemove", (e)=>{titreMove(e, element)});
  
      etatClick = true;

      element.style.backgroundColor = "rgb(145, 195, 255)";

      element.style.width = element.getBoundingClientRect().width+'px';
      main.appendChild(element);
      var rect = element.getBoundingClientRect();
      souriPos = {h: rect.height/2 , w: rect.width/2, l: rect.left};
      

      element.style.top = e.clientY - souriPos.h + "px";
      element.style.left = e.clientX - souriPos.l - souriPos.w + "px";

      drop.style.display = "block";
  }

  function titreMove(e, element){
    
    if(etatClick){   
      
      element.style.top = e.clientY - souriPos.h + "px";
      element.style.left = e.clientX - souriPos.l - souriPos.w + "px";
      playlistHover(element);
    }

  }

  function titreRelacher(e, element){

      etatClick = false;
      element.style.top=0+"px";
      element.style.left=0+"px";
      element.style.backgroundColor = "rgb(97, 97, 97)";
      

      if(etatPlaylist){
        setParent(element, playlist);
        element.style.top="0";
        element.style.left="0";
        if(onPlayVerificationClass == true){
          element.classList.add("onPlay");
          onPlayVerificationClass = false;
        }       
      }else{
        setParent(element, list_music);
      }

      var nmbElmPlay = playlist.getElementsByTagName("DIV").length/2;
      
      if(nmbElmPlay==0){
        drop.style.display = "block";
        list_path_music = [];
      }else{
        drop.style.display = "none";
        list_path_music = [];
        const song = playlist.querySelectorAll(".song");
        for (let i = 0; i < song.length; i++){
          let path_music = song[i].innerHTML;
          list_path_music.push(path_music);
        }
      }
      if(onPlayVerificationClass == true){
        currentSong--;
        nextClick();
        onPlayVerificationClass = false;
      } 
    
  }

  function setParent(el, newParent) {
    newParent.appendChild(el);
    el.style.width = 100+'%';
}

function playlistHover(element){
  var x1 = playlist.offsetLeft;
  var x2 = x1 + playlist.offsetWidth;
  var y1 = playlist.offsetTop;
  var y2 = y1 + playlist.offsetHeight;
  if (element.offsetLeft<x2){
    if(element.offsetLeft>x1){
      if(element.offsetTop<y2){
        if(element.offsetTop>y1){
          etatPlaylist = true;
          drop.style.opacity = "1";
             
        }else{
          etatPlaylist = false;
          drop.style.opacity = "0.5";
               
        }
      }else{
        etatPlaylist = false;
        drop.style.opacity = "0.5";
        
      }
    }else{
      etatPlaylist = false;
      drop.style.opacity = "0.5";
      
          
    }
  }else{
    etatPlaylist = false;
    drop.style.opacity = "0.5";             
  }
}