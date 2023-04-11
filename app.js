const movies = "batman";

async function main(searchTerm) {
  const Url = await fetch(
    `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=e3aee4a2`
  );
  const data = await Url.json();
  const moviesWrapper = document.querySelector(".movies");

  const moviesHtml = data.Search.map((movie) => {
    return `<div class="movie">
  <img src='${movie.Poster}' alt="">
  <h2>${movie.Title}</h2>
  <h4>${movie.Year}</h3>
  <button>Learn More</button>
  </div>`;
  })
    .slice(0, 6)
    .join("");

  moviesWrapper.innerHTML = moviesHtml;
}

main(movies);
