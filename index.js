
const searchInput= document.getElementById("searchbar");
const errorMsge= document.getElementById("errorMsge");
const movieInfo= document.getElementById("movieInfo");

searchInput.addEventListener("input", function () {
    if (searchInput.value){
        searchRta(searchInput.value);
    }else{
        movieInfo.innerHTML = "";
    }
});

function searchRta(strg){
    if (strg===0){
        movieInfo.innerHTML = "";
        return;
    }
    const searchValue= searchInput.value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const movies = JSON.parse(this.responseText);
            findMovies(movies, searchValue);
        }
    }
    xhr.open("GET","../Json/peliculas.json",true);
    xhr.send();
}


function findMovies(movies, searchVal){
    movieInfo.innerHTML = "";
    movies.sort((a, b) => b.name.localeCompare(a.name));
    movies.sort((a, b) => b.year - a.year);
    for (const movie of movies) {
        if (movie.name.toLowerCase().includes(searchVal.toLowerCase())){
        movieInfo.innerHTML += `<p class="movie_info"> ${movie.name}</p> <p class="movie_sum">${movie.summary}</p> <br>`;
        }else if(movie.year.includes(searchVal)){
            movieInfo.innerHTML += `<p class="movie_info">${movie.year} - ${movie.name}</p> <p class="movie_sum"> ${movie.summary}</p> <br>`;
        }
    };
    var allMovies;
    if(localStorage.getItem('Movies')){
        allMovies= JSON.parse(localStorage.getItem('Movies'));
        for (const movie of allMovies){
        if (movie.title.toLowerCase().includes(searchVal.toLowerCase())){
            movieInfo.innerHTML += `<p class="movie_info"> ${movie.title}</p> <p class="movie_sum">${movie.summary}</p> <br>`;
            }else if(movie.year.includes(searchVal)){
                movieInfo.innerHTML += `<p class="movie_info">${movie.title} - ${movie.year}</p> <p class="movie_sum"> ${movie.summary}</p> <br>`;
            }
    }
}
}

