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

// Like button
const likeButton = document.querySelector("[like-button]");
if (likeButton) {
  likeButton.addEventListener('click', () => {
    const songId = likeButton.getAttribute('like-button');
    const isActive = likeButton.classList.contains('active');

    const likeType = isActive ? 'dislike' : 'like';

    const option = {
      method: "PATCH"
    } 

    fetch(`/songs/like/${likeType}/${songId}`, option)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const span = likeButton.querySelector("span");
          span.innerHTML = `${data.like} like`;
          likeButton.classList.toggle('active');
        }
      })
  })
}

// End like button


// Favorite button
const favoriteButtonList = document.querySelectorAll("[favorite-button]");
if (favoriteButtonList.length > 0) {
  favoriteButtonList.forEach((favoriteButton) => {
    favoriteButton.addEventListener('click', () => {
      const songId = favoriteButton.getAttribute('favorite-button');
      const isActive = favoriteButton.classList.contains('active');
  
      const favoriteType = isActive ? 'unfavorite' : 'favorite';
  
      const option = {
        method: "PATCH"
      } 
  
      fetch(`/songs/favorite/${favoriteType}/${songId}`, option)
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            favoriteButton.classList.toggle('active');
          }
        })
    })
  })
}



// End button

