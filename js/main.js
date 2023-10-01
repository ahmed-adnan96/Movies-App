//------------------------------------------------------------------Global Variable
let showMovie = document.querySelector("#showMovies");

//------------------------------------------------------------------sideNavbar logic

$(".loading-screen").ready(() => {
  getNowPlay().then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
function openNav() {
  $(".side-navbar").animate({ left: "0px" }, 500);
  $(".closeNav").removeClass("fa-align-justify");
  $(".closeNav").addClass("fa-x");
  for (let i = 0; i < 6; i++) {
    $(".items-link li")
      .eq(i)
      .animate({ top: 0, opacity: 1 }, (i + 5) * 200);
  }
}

function closeNav() {
  let widthinner = $(".inner-side").innerWidth();
  $(".side-navbar").animate({ left: -widthinner }, 500);
  $(".closeNav").removeClass("fa-x");
  $(".closeNav").addClass(" fa-align-justify");
  for (let i = 0; i < 6; i++) {
    $(".items-link li")
      .eq(i)
      .animate({ top: 300, opacity: 0 }, (i + 5) * 100);
  }
}
closeNav();
$(".closeNav").click(() => {
  if ($(".side-navbar").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

//------------------------------------------------------------------Api generate
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTIzMzJhYzgxZDJjNGJmZDMwYTY5OGNjZjUyYjRkMiIsInN1YiI6IjYwOTc2MDI2YjJlMDc0MDAzZTZmOTJhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKeETc28j4vYbo5pnRIYTOW2ajJ6zcMGKuJdSifrZ9s",
  },
};

//------------------------------------------------------------------Api NowPlaying

async function getNowPlay() {
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTIzMzJhYzgxZDJjNGJmZDMwYTY5OGNjZjUyYjRkMiIsInN1YiI6IjYwOTc2MDI2YjJlMDc0MDAzZTZmOTJhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKeETc28j4vYbo5pnRIYTOW2ajJ6zcMGKuJdSifrZ9s",
      },
    }
  );
  response = await response.json();

  displayMovies(response.results);
}

function displayMovies(arr) {
  let cartona = ``;

  for (let i = 0; i < arr.length; i++) {
    let rate = ``;

    if (arr[i].vote_average < 7) {
      for (let j = 0; j < 3; j++) {
        rate += `<li><i class="fa-solid fa-star text-warning fs-6"></i></li>`;
      }
    } else if (arr[i].vote_average >= 7 && arr[i].vote_average < 8) {
      for (let z = 0; z < 3; z++) {
        rate += `<li><i class="fa-solid fa-star text-warning fs-6"></i></li>,`;
      }
      rate = rate.split(",");
      rate.push(`          <li>
      <i
        class="fa-regular fa-star-half-stroke text-warning fs-6"
      ></i>
    </li>`);
      rate = rate.join("");
    } else {
      for (let z = 0; z < 4; z++) {
        rate += `<li><i class="fa-solid fa-star text-warning fs-6"></i></li>`;
      }
    }

    cartona += `<div class=" col-ms-12 col-md-6 col-lg-4">
    <div class="item-movie position-relative">
      <div class="img-movie rounded-3 overflow-hidden">
        <img class="img-default" src="https://image.tmdb.org/t/p/w500${
          arr[i].poster_path
        }" class="w-100 rounded-3" alt="" />
      </div>
      <div
        class="overlay p-2 position-absolute top-0 bottom-0 start-0 end-0 px-4"
      >
        <div class="hide-details">
          <h2
            class="text-white pt-4 animate__animated animate__bounce animate__delay-1s"
          >
            ${arr[i].title}
          </h2>
          <p class="text-white py-5">
          ${arr[i].overview.split(" ").slice(0, 30).join(" ")}
          </p>
          <h5 class="text-white">Release Data : ${arr[i].release_date}</h5>
          <ul
            class="rate list-unstyled d-flex w-25 justify-content-around"
          >
            ${rate}
          </ul>
          <div
            class="rate-num text-white d-flex justify-content-center align-items-center p-1"
          >
            <h4>${Number(arr[i].vote_average).toFixed(1)}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
  showMovie.innerHTML = cartona;
}

//------------------------------------------------------------------Api NowPlayingclick

$("#nowPlaying").click(() => {
  closeNav();
  $("#showMovies").fadeOut(200);
  getNowPlay();
  $("#showMovies").fadeIn(200);
});
//------------------------------------------------------------------Api Popular

async function getPopular() {
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  response = await response.json();
  // console.log(response.results);
  displayMovies(response.results);
}

$("#popular").click(() => {
  closeNav();
  $("#showMovies").fadeOut(200);
  getPopular();
  $("#showMovies").fadeIn(200);
});
//------------------------------------------------------------------Api TopRated

async function getTopRated() {
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  response = await response.json();
  // console.log(response.results);
  displayMovies(response.results);
}

$("#topRated").click(() => {
  closeNav();
  $("#showMovies").fadeOut(200);
  getTopRated();
  $("#showMovies").fadeIn(200);
});
//------------------------------------------------------------------Api upComming

async function getUpComing() {
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  );
  response = await response.json();
  console.log(response.results);
  displayMovies(response.results);
}
$("#upComing").click(() => {
  closeNav();
  $("#showMovies").fadeOut(200);
  getUpComing();

  $("#showMovies").fadeIn(200);
});
//------------------------------------------------------------------Api Trending

async function getTrend() {
  let response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  response = await response.json();
  console.log(response.results);
  displayMovies(response.results);
}

$("#trending").click(() => {
  closeNav();
  $("#showMovies").fadeOut(200);
  getTrend();

  $("#showMovies").fadeIn(200);
});
$("#searchInput").keyup((e) => {
  e.target.value ? searchMovies(e.target.value) : getNowPlay();
});
async function searchMovies(movie) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=612332ac81d2c4bfd30a698ccf52b4d2`,
    options
  );
  response = await response.json();

  displayMovies(response.results);
}

function getAnimateScroll() {
  let sectionOffset = $(".movies").offset().top;
  console.log(sectionOffset);
  $(window).scroll(function () {
    let windowScroll = $(window).scrollTop();
    if (windowScroll > sectionOffset + 100) {
      $("#btnUp").fadeIn(500);
    } else {
      $("#btnUp").fadeOut(500);
    }
  });
  $("#btnUp").click(function () {
    $("html , body").animate({ scrollTop: 0 }, 500);
  });
  $("#nowPlaying").click(function () {
    $("html , body").animate({ scrollTop: 0 }, 500);
  });
  $("#popular").click(function () {
    $("html , body").animate({ scrollTop: 0 }, 500);
  });
  $("#topRated").click(function () {
    $("html , body").animate({ scrollTop: 0 }, 500);
  });
  $("#trending").click(function () {
    $("html , body").animate({ scrollTop: 0 }, 500);
  });
  $("#upComing").click(function () {
    $("html , body").animate({ scrollTop: 0 }, 500);
  });
  $("#contactUS").click(function () {
    $("html , body").animate({ scrollTop: 10000 }, 500);
  });
}
getAnimateScroll();

/* vailid  */
document.querySelector("#submit").addEventListener("click", () => {
  if (validateInputs()) {
    clearInputs();
  }
});
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userPhone = document.querySelector("#userPhone");
const userAge = document.querySelector("#userAge");
const userPass = document.querySelector("#userPassword");
const userRePass = document.querySelector("#userRePassword");
function clearInputs() {
  const userNameValue = userName.value.trim();
  const emailValue = userEmail.value.trim();
  const phoneValue = userPhone.value.trim();
  const ageValue = userAge.value.trim();
  const password = userPass.value.trim();
  // const rePassword = userRePass.value;
  userNameValue.value = "";
  emailValue.value = "";
  phoneValue.value = "";
  ageValue.value = "";
  password.value = "";
  // rePassword.value = "";
}
const validateInputs = () => {
  const userNameValue = userName.value.trim();
  const emailValue = userEmail.value.trim();
  const phoneValue = userPhone.value.trim();
  const ageValue = userAge.value.trim();
  const password = userPass.value.trim();
  // const rePassword = userRePass.value;
  if (userNameValue === "") {
    setError(userName, "Username is required");
  } else {
    setSuccess(userName);
    clearInputs();
  }
  if (emailValue === "") {
    setError(userEmail, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(userEmail, "Provide a valid email address");
  } else {
    setSuccess(userEmail);
    clearInputs();
  }
  if (phoneValue === "") {
    setError(userPhone, "Phone Number is required");
  } else if (phoneValue.length <= 10) {
    setError(userPhone, "Phone Number must be at least 10 Numbers.");
  } else {
    setSuccess(userPhone);
    clearInputs();
  }
  if (ageValue === "") {
    setError(userAge, "age is required");
  } else if (ageValue <= 18) {
    setError(userAge, "age  must be at least 18 years.");
  } else {
    setSuccess(userAge);
    clearInputs();
  }
  if (password === "") {
    setError(userPass, "Password is required");
  } else if (password.length < 8) {
    setError(userPass, "Password must be at least 8 character.");
  } else {
    setSuccess(userPass);
    clearInputs();
  }
  // if (rePassword === "") {
  //   setError(userRePass, "Please confirm your password");
  // } else if (rePassword !== password) {
  //   setError(userRePass, "Passwords doesn't match");
  // } else {
  //   setSuccess(userRePass);
  // }
};
