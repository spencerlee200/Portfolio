window.addEventListener('load', (e) => {
  e.preventDefault();
  var con = new Controller();
});


class Controller
{
  constructor()
  {
    console.log("Ready to go!");
    this.model = new Model();
    this.view = new View();
    var str = localStorage.getItem("storage");
    var arr = JSON.parse(str) || arr;
    this.movies = arr;
    this.view.displayAll(this.movies);

    document.querySelector('#add').addEventListener('click', (e)=>
    {
      e.preventDefault();
      this.model.getMovieData();
      $("#input").val(" ").placeholder();
    });

    document.addEventListener('back', (e)=>
    {
      e.preventDefault();
      this.view.displayAll(this.movies);
    });

    document.addEventListener('newMovie', (e) =>
    {
      e.preventDefault();
      if(e.data.Title != undefined && e.data.Poster != "N/A")
      {
        var movie = new Object();
            movie.title = e.data.Title;
            movie.poster = e.data.Poster;
            movie.cast = e.data.Actors;
            movie.awards = e.data.Awards;
            movie.country = e.data.Country;
            movie.director = e.data.Director;
            movie.writer = e.data.Writer;
            movie.genre = e.data.Genre;
            movie.language = e.data.Language;
            movie.metascore = e.data.Metascore;
            movie.description = e.data.Plot;
            movie.rated = e.data.Rated;
            movie.release = e.data.Released;
            var year = e.data.Released.split(" ");
            movie.year = year[2];
            movie.runTime = e.data.Runtime;
            movie.imbdID = e.data.imbdID;
            movie.imdbRating = e.data.imdbRating;

            //Inclusions for later versions with nested objects
            //Both will contain post object which contain nested reply objects
            movie.reviews = [];
            movie.ourScore = [];
        this.movies.push(movie);
        localStorage.setItem("storage", JSON.stringify(this.movies));

        var str = localStorage.getItem("storage");
        var arr = JSON.parse(str) || arr;
        this.view.displayAll(arr);
      }
      else
      {
        alert("Sorry movie not found!");
      }

    }, false);
  }
}

class Model
{
  constructor()
  {
    console.log("Model Created");
  }

  getMovieData()
  {
    console.log("New Movie Being Requested...");
    var movieTitle = document.querySelector('#input').value;
    $.ajax({
        url: "http://www.omdbapi.com/?t=" + movieTitle + "&r=json",
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          if(response.error){
            console.log(response.error);
          } else {
            var newMovie = new Event('newMovie');
            newMovie.data = response;
            document.dispatchEvent(newMovie);
          }
        }
    });
  }
}

class View
{
  contructor()
  {
    console.log("View Created");
  }

  displayAll(arr)
  {
    $("#Movies").html(" ");
    var content = " ";
    for(var i = 0; i < arr.length; i++)
    {
        content += "<div id='movie_" + i + "' class='block'>";
        content += "<img src='" + arr[i].poster + "' />";
        content += "<h2> " + arr[i].title + " (" +  arr[i].year + ")" + "</h2>";
        content += "</div>";
    }
    $("#Movies").html(content);
    $('.block').on('click', function(e) {
      var id = e.currentTarget.id.split("_")[1];
      var content = " ";
      $("#Movies").html(" ");
      content += "<i id='back' class='fa fa-arrow-circle-o-left' aria-hidden='true'></i>"
      content += "<div class = 'img'>";
      content += "<img src='" + arr[id].poster + "' />";
      content += "</div>";

      content += "<div class='sBlock'>";
      content += "<h2> " + arr[id].title + "</h2>";
      content += "<p>";
      content += "<span> Rated: " + arr[id].rated + "</span>";
      content += "<span> Released: " + arr[id].release + "</span>";
      content += "</p>";

      content += "<p> Runtime: " + arr[id].runTime + "</p>";

      content += "<p>";
      content += "<span> Country: " + arr[id].country + "</span>";
      content += "<span> Language: " + arr[id].language + "</span>";
      content += "</p>";

      content += "<p> Genres: ";
      arr[id].genre.split(",").forEach((e) => {
      content += "<span class='genre'>" + e + "</span>";
      });
      content += "</p>";

      content += "<p> Main Cast: ";
      arr[id].cast.split(",").forEach((e) => {
      content += "<span class='cast'> " + e + "</span>";
      });
      content += "</p>";

      content += "<h3> Description: </h3>";
      content += "<p> " + arr[id].description + "</p>";

      content += "<p> Awards: " + arr[id].awards + "</p>";
      content += "<p> Director: " + arr[id].director + "</p>";

      content += "<p> Writers: ";
      arr[id].writer.split(",").forEach((e) => {
      content += "<span class='writer'> " + e + "</span>";});
      content += "</p>";

      content += "<div class='rating'>";
      content += "<p> 0 </p>"
      //content += "<p>" + arr[id].ourScore + "</p>";
      content += "<p> Our Score";
      content += "</div>";

      content += "<div class='rating'>";
      content += "<p>" + Math.floor(arr[id].imdbRating * 10) + "</p>";
      content += "<p> IMBD Rating";
      content += "</div>";

      content += "<div class='rating'>";
      content += "<p>" + arr[id].metascore + "</p>";
      content += "<p> Metascore Rating";
      content += "</div>";

      content += "</div>";
      $("#Movies").html(content);
      $("#back").on('click', function() {
        var back = new Event('back');
        document.dispatchEvent(back);
      });
    });
  }
}
