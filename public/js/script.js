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
          if (data && data.code == 200) {
            favoriteButton.classList.toggle('active');
          }
        })
    })
  })
}

// End favorite button

// Searching suggest

const boxSearch = document.querySelector('.box-search');
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const innerSuggest  = boxSearch.querySelector('.inner-suggest');

  input.addEventListener('keyup', () => {
    const keyword = input.value;

    fetch(`/search/suggest?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.code == 200) {
          const songs = data.songs;
          if (songs.length > 0) {
            const htmls = songs.map(song => (
              `<a class="inner-item" href="/songs/detail/${song.slug}">
                <div class="inner-image">
                  <img src="${song.avatar}" />
                </div>
                <div class="inner-info">
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-singer">
                      <i class="fa-solid fa-microphone-lines"></i> ${song.singerInfo.fullName}
                    </div>
                </div>
              </a>`
            ))
            
            const innerList = document.querySelector('.inner-list');
            innerList.innerHTML = htmls.join('');
            innerSuggest.classList.add("show");

          } else {
            innerSuggest.classList.remove('show');
          }
        }
      })
  })
}
// End searching suggest

