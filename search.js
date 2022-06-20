const searchResultDiv = document.querySelector(".search_result_div");
const searchBtn = document.querySelector(".search");
const searchHeader = document.getElementById("search_header");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const hamburger = document.querySelector(".hamburger");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const lightDarkmode = document.querySelector(".light_darkmode");
const arrowLeft = document.querySelector(".arrow_left");
const sidenavChildContainer = document.querySelector(".sidenav_child_container");


hamburgerPhone.addEventListener("click", function () {
    sidenavChildContainer.classList.add("sidenav_container_active");
    overlaySideNavabar.classList.add("sidenav_container_active");
    hamburgerPhone.classList.add("hamburgerphonedeactive");
});

overlaySideNavabar.addEventListener("click", function () {
    sidenavChildContainer.classList.remove("sidenav_container_active");
    overlaySideNavabar.classList.remove("sidenav_container_active");
    document.body.classList.remove("minimize_siderbar");
    hamburgerPhone.classList.remove("hamburgerphonedeactive");
});




arrowLeft.addEventListener("click", function () {
    document.body.classList.remove("minimize_siderbar");
});

let currthemeObj;

lightDarkmode.addEventListener("click", function () {
    document.body.classList.toggle("light");
    let bodyattr = document.body.getAttribute("class").split(" ");
    let currtheme = localStorage.getItem('currtheme')
    currtheme = null
    if (currtheme == null) {
        currthemeObj = [];
    }
    else {
        currthemeObj = JSON.parse(currtheme)
    }
    currthemeObj.push(bodyattr)
    localStorage.setItem("currtheme", JSON.stringify(currthemeObj));
});

hamburger.addEventListener("click", function () {
    document.body.classList.add("minimize_siderbar");
});


function settheme() {
    let currtheme = localStorage.getItem('currtheme')
    if (currtheme == null) {
        currthemeObj = [];
    }
    else {
        currthemeObj = JSON.parse(currtheme)
    }
    if (currthemeObj.length === 2) {
        document.body.classList.add("light");
    }
    else {
        document.body.classList.remove("light");
    }
}

settheme()





const myApi = "6b2dec73b6697866a50cdaef60ccffcb";










const searchitem = async (srchquery) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${myApi}&language=en-US&query=${srchquery}&page=1`);
    const data = await res.json();
    const NowPlayingmovies = data.results;
    return NowPlayingmovies;
};


const searchfun = (movie) => {
    let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
    return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${movie.id
        }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
        }"></a>
         <p class="movie_title movie_title_search" >${movie.title}</p>
         <div class="date_rating">
             <p class="date date_search">${dateFormatter(movie.release_date)}</p><span class="dot dot2"></span>
             <p class="rating rating_search">${movie.vote_average
        }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category category_search">Movie</div>
             </div>
         </div>`;
};




const dateFormatter = function (date) {
    let currdate = date;
    let newDate = currdate.slice(0, 4);
    return newDate;
};

searchBtn.addEventListener('keyup', function () {
    if (searchBtn.value != "") {
        let htmll = " "
        searchResultDiv.innerHTML = "";
        let searchQuery = searchBtn.value;
        searchHeader.textContent = `Search results for ${searchQuery.toUpperCase()} :`
        searchitem(searchQuery).then((movies) => {
            movies.forEach((moviee) => {
                if ('release_date' in moviee && moviee.poster_path != null) {
                    htmll += searchfun(moviee);
                    searchResultDiv.innerHTML = htmll;
                }
            });
        });
    }
})





window.onload = function () {
    searchBtn.focus();

}


