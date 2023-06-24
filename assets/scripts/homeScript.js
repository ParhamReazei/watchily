//
function signedInChecker() {
  if (!localStorage.getItem("userName")) {
    location.href = "../../index.html";
  }
}
//handling top of the main page with jquery when scrolling
$(window).scroll(function () {
  var sc = $(window).scrollTop();
  if (sc > 40) {
    $(".top").addClass("small");
    $(".library").addClass("small");
  } else {
    $(".top").removeClass("small");
    $(".library").removeClass("small");
  }
});
const userName = localStorage.getItem("userName");
const libraryChecker = document.getElementsByClassName("movies")[0];

//reading movies from db
(async () => {
  libraryChecker.innerHTML = `<div class='loading'>
  <div class='inner-loading-first'></div>
  <div class='inner-loading-second'></div>
  <div class='inner-loading-third'></div>
  </div>`;
  const response = await fetch(
    "https://6489722d5fa58521caaf9b75.mockapi.io/movies",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const userData = data.filter((item) => item.persons == userName);
      if (userData.length) {
        libraryChecker.innerHTML = "";
      } else {
        libraryChecker.querySelector(".loading").remove();
        const notFound = document.createElement("p");
        notFound.classList.add("not-found");
        notFound.innerHTML = "your Library is empty";
        libraryChecker.appendChild(notFound);
      }

      userData.map((item) => {
        const movie = document.createElement("div");
        const newMovie = `
        <img 
          src="../img/icons8-delete-24.png"
          alt="${item.id}"
          class="edit-button"
          onclick="editPandel(event)"
          />
          <img
          src="${item.image}"
          alt=""
          />
          <div>
          <p class="movie-title">Title:</p>
          <p class="movie-name">${item.title}</p>
          </div>
          <div>
          <p class="details-title">Details:</p>
          <p class="details">${item.details}</p>
        </div>`;
        movie.innerHTML += newMovie;
        movie.classList.add("movie");
        libraryChecker.appendChild(movie);
      });
    })
    .catch((error) => {
      console.log(error);
    });
})();

//handling add movies
async function handelSubmit(e) {
  e.preventDefault();
  const movieImage = document.getElementById("movieImage");
  const movieTitle = document.getElementById("movieName");
  const movieDetail = document.getElementById("movieDetails");
  if (movieDetail.value && movieImage.value && movieTitle.value) {
    await axios.post("https://6489722d5fa58521caaf9b75.mockapi.io/movies", {
      image: `${movieImage.value}`,
      title: `${movieTitle.value}`,
      details: `${movieDetail.value}`,
      persons: `${userName}`,
    });
    window.location.reload();
  } else {
    document.getElementById("inputWarning").style = "display:block;";
  }
}

//handling logout movie
function logOut() {
  localStorage.clear();
  location.href = "/index.html";
}

//handling delete an item from mock api
// (async () => {
//   await fetch(`https://6489722d5fa58521caaf9b75.mockapi.io/movies/${movieId}`, {
//     method: "DELETE",
//   });
// })();

function editPandel(e) {
  const getId = e.target.parentElement.getElementsByTagName("img")[0].alt;
  console.log(getId);
  (async () => {
    await fetch(`https://6489722d5fa58521caaf9b75.mockapi.io/movies/${getId}`, {
      method: "DELETE",
    });

    window.location.reload();
  })();
}
