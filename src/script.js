const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const themoviedb_URL = 'https://api.themoviedb.org/3';
const API_URL = themoviedb_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = themoviedb_URL + '/search/movie?'+API_KEY;
const $main = document.getElementById('main')
const next = document.getElementById('next')
const current = document.getElementById('current')
const tagsEl = document.getElementById('tags');


const typeFlm = [
    {
      
      "name": "Action 🤠"
    },
    {
      "id": 12,
      "name": "Aventure 😆"
    },
    {
      "id": 16,
      "name": "Animation 🐻"
    },
    {
      "id": 35,
      "name": "Comédie 😂"
    },
    {
      "id": 80,
      "name": "Crime 🔪🩸"
    },
    {
      "id": 99,
      "name": "Documentaire 🤓"
    },
    {
      "id": 18,
      "name": "Drama 🥺"
    },
    {
      "id": 10751,
      "name": "Famille 👨‍👩‍👦‍👦"
    },
    {
      "id": 14,
      "name": "Fantaisie 🤯"
    },
    {
      "id": 36,
      "name": "Histoire 🏰"
    },
    {
      "id": 27,
      "name": "Horreur 👹"
    },
    {
      "id": 10402,
      "name": "Musique 🎶"
    },
    {
      "id": 9648,
      "name": "Mystère 😶"
    },
    {
      "id": 10749,
      "name": "Romance 😭"
    },
    {
      "id": 878,
      "name": "La science-fiction 🤖"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Polar"
    },
    {
      "id": 10752,
      "name": "Guerre ⚔️"
    },
    {
      "id": 37,
      "name": "Occidentale "
    }
  ]

  var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    typeFlm.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}
var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
        fetch(url)
        .then(function(response) {

        return response.json();

  })
        .then(function(data) {
          console.log(data)
        
          showMovie(data.results)
    })

}
function showMovie(data){
    $main;innerHTML="";
    // mtn j'affiches des info mais je met dais meme const 
    data.forEach(movie =>{
        const {title,poster_path,vote_average,overview}= movie;
        console.log("ok loop")
        let elementMovie =document.createElement('div');
        elementMovie.classList.add('movie');
        elementMovie.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${color_note(color_note)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>
                ${overview}
                </h3>
            </div>
        `
        $main.appendChild(elementMovie);
    })
    }

function color_note (color){
    if(color >= 8){
        console.log('green')
        return 'grenne'
    }else if(color >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}
prev.addEventListener('click', () => {
    if(prevPage > 0){
      pageCall(prevPage);
    }
  })
  
  next.addEventListener('click', () => {
    if(nextPage <= totalPages){
      pageCall(nextPage);
    }
  })
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  var menuClose = document.querySelector('.close');

  menuBtn.addEventListener('click', function(event) {
    event.preventDefault();
    menu.classList.add('is-open');
  });

  menuClose.addEventListener('click', function(event) {
    event.preventDefault();
    menu.classList.remove('is-open');
  });