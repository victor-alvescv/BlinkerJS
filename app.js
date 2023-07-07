const moviesWrapper = document.querySelector(".movies");
const nameWrapper = document.querySelector(".searchName");
const MovieHtml = `<div class="content-wrapper">
<div class="loading-state flex justify-center">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 .movies__loading--spinner" style="font-size: 30px; color: #b62265;;">
    <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
  </svg>
</div>
</div>`;

const ErrorHtml = `<div class="content-wrapper"
<div class="error__wrapper">
<img class="error__img" src="assets/error__img.svg" alt="">
</div>
<div class="error-text-wrapper">
<h2 class="error__text">Oops!...  <span style="color: #b62265;">Looks like something went wrong!</span></h2>
<h3 class="error__subtitle" style="color: white">Try again <span style="color: #b62265;">please.</span></h3>
</div>
</div>`;

const StartHtml = `<div class="content-wrapper">
<div class="img__wrapper">
  <img class="initial__img" src="assets/start__img.svg" alt="">
</div>
<h2 class="img__text">Start your search inside <span style="color: #b62265;">our library!</span></h2>
<h3 style="color: white">The best service <span style="color: #b62265;">for you.</span></h3>`;

moviesWrapper.innerHTML = MovieHtml;

if (onSearchChange()) {
  async function onSearchChangeIcon(event) {
    const searchTerm = event.target.value;
    nameWrapper.innerHTML = '"' + searchTerm + '"';
    moviesWrapper.innerHTML = MovieHtml;

    const response = await fetch(
      `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=e3aee4a2`
    );
    const data = await response.json();

    if (data.Search === undefined) {
      moviesWrapper.innerHTML = ErrorHtml;
    }
    setTimeout(() => {
      moviesWrapper.innerHTML = data.Search.map((movie) => {
        return `<div class="movie">
  <img src='${movie.Poster}' alt="">
  <h2>${movie.Title}</h2>
  <h4>${movie.Year}</h3>
  <button>Learn More</button>
  </div>`;
      })
        .slice(0, 6)
        .join("");
    }, 1000);
  }
}

async function onSearchChange(event) {
  const searchTerm = event.target.value;
  nameWrapper.innerHTML = '"' + searchTerm + '"';
  moviesWrapper.innerHTML = MovieHtml;

  const response = await fetch(
    `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=e3aee4a2`
  );
  const data = await response.json();

  if (data.Search === undefined) {
    moviesWrapper.innerHTML = ErrorHtml;
  }
  setTimeout(() => {
    moviesWrapper.innerHTML = data.Search.map((movie) => {
      return `<div class="movie">
  <img src='${movie.Poster}' alt="">
  <h2>${movie.Title}</h2>
  <h4>${movie.Year}</h3>
  <button>Learn More</button>
  </div>`;
    })
      .slice(0, 6)
      .join("");
  }, 1000);
}

setTimeout(() => {
  async function getMovies(searchTerm) {
    const response = await fetch(
      `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=e3aee4a2`
    );
    const data = await response.json();

    if (data.Search === undefined) {
      moviesWrapper.innerHTML = StartHtml;
    }
    moviesWrapper.innerHTML = data.Search.map((movie) => {
      return `<div class="movie">
  <img src='${movie.Poster}' alt="">
  <h2>${movie.Title}</h2>
  <h4>${movie.Year}</h3>
  <button>Learn More</button>
  </div>`;
    })
      .slice(0, 6)
      .join("");
  }

  getMovies("");
}, 300);
