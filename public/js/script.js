// APlayer

const aplayer = document.querySelector('#aplayer');
if (aplayer) {
  let songData = aplayer.getAttribute('song-data');
  let singerData = aplayer.getAttribute('singer-data');

  songData = JSON.parse(songData);
  singerData = JSON.parse(singerData);

  const ap = new APlayer({
    container: aplayer,
    audio: [{
        name: songData.title,
        artist: singerData.fullName,
        url: songData.audio,
        cover: songData.avatar
    }],
    autoplay: true
  });

  const avatar = document.querySelector('.inner-play .inner-avatar');

  ap.on('play', function () {
    avatar.style.animationPlayState = 'running';
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = 'paused';
  });

}

// End APlayer