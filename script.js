const musics=[
  
      {
        "id": 1,
        "name": "ambient-technology-155704"
      },
      {
        "id": 2,
        "name": "In Heat ! Hentai Xander ! Instrumental Bgm Theme"
      },
      {
        "id": 3,
        "name": "Tell-Me-Once-Yo-Yo-Honey-Singh--Alfaaz"
      },
      {
        "id": 4,
        "name": "Naan Ready Leo(audiosong.in)"
      },
      {
        "id": 5,
        "name": "Oonchi Oonchi Waadi - OMG 2 320 Kbps"
      },{
        "id": 6,
        "name": "Dil Se Dil Tak Bawaal 320 Kbps"
      },
      {
        "id": 7,
        "name": "Gujju Pataka Satyaprem Ki Katha 320 Kbps"
      }
    
    
  ]
  const jsmediatags = window.jsmediatags;
  const music = document.querySelector('audio');
  const play = document.getElementById('play');
  const image = document.querySelector('img');
  // const image = document.getElementById('img');

  const artist = document.getElementById('artist');
  const title = document.getElementById('title');
  const next = document.getElementById('forward');
  const prev = document.getElementById('backward');
  const audiopath = document.getElementById('myaudio');
  const progressed = document.getElementById('progressed');
  const progress_bar = document.getElementById('progress_bar');
  const start = document.getElementById('initial');
  const end = document.getElementById('end');


  let isplaying = false;
  const playmusic = () => {
    
      music.play();
      
      isplaying = true;
      play.classList.replace('fa-play', 'fa-pause');
      // console.log("music")
      img.classList.add("anime");
  };
  // for pause
  const puasemusic = () => {

      music.pause();
      isplaying = false;
      play.classList.replace('fa-pause', 'fa-play');
      // console.log("music")
      img.classList.remove("anime");
  };
  play.addEventListener('click', () => {
      if (isplaying) {
          puasemusic();
      } else {
          playmusic();
      }

  });

  function handleLoadedData() {
    const file = music.src;
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const data = tag.tags.picture.data;
        const format = tag.tags.picture.format;
  
        let base64String = '';
        for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i]);
        }
  
        image.src = `data:${format};base64,${window.btoa(base64String)}`;
  
        const artistName = tag.tags.artist || 'Unknown Artist';
        const titleName = tag.tags.title || 'Unknown title';
  
      
  
        artist.innerHTML = artistName;
        title.innerHTML = titleName;
      },
      onError: function (error) {
        
        const artistName =  'Unknown Artist';
        const titleName =  'Unknown title';
        
        artist.innerHTML = artistName;
        title.innerHTML = titleName;
        image.src=`pngimg.com - vinyl_PNG111.png`;
      }
    });
  }
  handleLoadedData();
  

  let ms = 0;

  const nextmusic = () => {
    const song = musics[ms]; // Move this line inside the function
    ms = (ms + 1) % musics.length;
    
    audiopath.src = `music/${song.name}.mp3`;
   
    playmusic();
    handleLoadedData();
  };
  
  
  
  next.addEventListener('click', nextmusic);
  next.addEventListener('click',handleLoadedData);
  
  //previous music
  
  const prevmusic = () => {
    const song = musics[ms]; 
    ms = (ms - 1 + musics.length) % musics.length;
    
    audiopath.src = `music/${song.name}.mp3`;
   
    playmusic();
  };
  
  
  
  prev.addEventListener('click', prevmusic);
  prev.addEventListener('click',handleLoadedData);
  
  
    audiopath.ontimeupdate = function(){
      console.log('playing')
      progressed.style.width = Math.floor(audiopath.currentTime*100/audiopath.duration)+"%";
      // Math.floor(audiopath.currentTime);
      const minutes = Math.floor(audiopath.currentTime / 60);
  const seconds = Math.floor(audiopath.currentTime % 60);
  let a=`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  start.innerHTML=`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const minutes1 = Math.floor(audiopath.duration / 60);
  const seconds1 = Math.floor(audiopath.duration % 60);
  let b=`${minutes1.toString().padStart(2, '0')}:${seconds1.toString().padStart(2, '0')}`;
  end.innerHTML=`${minutes1.toString().padStart(2, '0')}:${seconds1.toString().padStart(2, '0')}`;
  if(a==b){
    nextmusic();
  }
    }


    progress_bar.onclick = function(e) {
      const clickedTime = (e.offsetX / progress_bar.offsetWidth) * audiopath.duration;
      music.currentTime = clickedTime;
    };




