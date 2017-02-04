angular.module("MyApp", ["firebase","ngRoute"])
  .config(function($routeProvider) {
    $routeProvider.when("/Home",{
      templateUrl: "partials/list.html"
    }).when("/Movie", {
      templateUrl: "partials/movie.html"
    }).otherwise({
      redirectTo : "/Home"
    })
  })

  .controller("MyController", function($scope,$filter, AppService, $firebaseArray, $route) {
      var ref = firebase.database().ref("movies");
      var revref = firebase.database().ref("reviews");
      $scope.movies = $firebaseArray(ref);
      $scope.reviews = $firebaseArray(revref);
      $scope.filter = [];
      $scope.filter[1] = "-";
      $scope.options = ["Recently Added", "Date Added", "A-Z", "Z-A", "Rating"];
      $scope.options.text = "Recently Added";

      $scope.back = function(){
        document.location.hash = "#/Home";
      }

      $scope.$on('$viewContentLoaded', function() {
        $scope.round = true;
        $(function () {
          $("#rateYo").rateYo({
            rating: 3,
            ratedFill: "#F44336",
          });
        });
      });

      $scope.search = function(){
        var goFind = function(found){
          var result = $filter('filter')($scope.movies, {title: found}, false);
          return result;
        };
        var find = $("#Search > input").val();
        if(find != ""){
          var returned = goFind(find);
          if(returned[0] != undefined){
            $scope.viewMovie = $scope.movies[returned[0].id];
            $scope.reviews.num = returned[0].id;
            document.location.hash = "#/Movie";
          }
          else {
            $("body").animate({scrollTop: $("#AddHero").offset().top}, 2000);
            $("#Search > input").attr("placeholder", "Title...").val("").focus().blur();
            $("#input").val(find);
          }
        }else {
          $scope.round = !$scope.round;
          if($scope.round) {
            $('#Search > button').css('border-top-left-radius', '5px');
            $('#Search > button').css('border-bottom-left-radius', '5px');
          }
          else {
            $('#Search > button').css('border-top-left-radius', '0');
            $('#Search > button').css('border-bottom-left-radius', '0');
          }
          var options = { direction: 'right' };
          $("#Search > input").toggle('slide', options, 300);
        }
      }

      $scope.addMovie = function() {
        AppService.getMovie();
      }

      $scope.addReview = function() {
        var review = {
          movieID: $scope.reviews.num,
          rating: $("#rateYo").rateYo("rating"),
          text: $("#rta").val(),
          name: $("#rn").val()
        }
        $scope.reviews.$add(review);
        $("#rta").val(" ");
        $("#rn").val(" ");
      }

      $scope.displayMovie = function(title) {
        for(var i = 0; i < $scope.movies.length; i++){
          if($scope.movies[i].title == title){
            $scope.viewMovie = $scope.movies[i];
            $scope.reviews.num = $scope.movies[i].id;
          }
        }
        document.location.hash = "#/Movie";
      }

      $scope.sort = function(){
        var options = { direction: 'right' };
        $("#genreBar").toggle('slide', options, 300);
        $("#genreBar p").each(function(i) {
          $(this).css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(images/genres/'+ i + '.jpg)');
        });
      }

      $scope.order = function(){
        if($scope.options.text == "Recently Added"){
          $scope.filter[1] = "-";
        }
        if($scope.options.text == "Date Added"){
          $scope.filter[1] = "+";
        }
        if($scope.options.text == "A-Z"){
          $scope.filter[1] = "+title";
        }
        if($scope.options.text == "Z-A"){
          $scope.filter[1] = "-title";
        }
        if($scope.options.text == "Rating"){
          $scope.filter[1] = "-imdbRating";
        }
      }

      $("#genreBar p").on("click", function(e) {
        if(e.target.innerHTML == "All"){
          $scope.filter[0] = undefined;
        }
        else {
          $scope.filter[0] = e.target.innerHTML;
        }
        $route.reload();
        var options = { direction: 'right' };
        $("#genreBar").toggle('slide', options, 300);
      });

      document.addEventListener('newMovie', (e) =>
      {
        e.preventDefault();
        $("#input").attr("placeholder", "Title...").val("").focus().blur();
        var unique = true;
        for(var i = 0; i < $scope.movies.length; i++){
          if(e.data.Title == $scope.movies[i].title){
            unique = false;
          } else {
            unique = true;
          }
        }
        if(e.data.Title != undefined && e.data.Poster != "N/A" && e.data.Type == "movie" && unique)
        {
          var movie = {
            id: $scope.movies.length,
            title: e.data.Title,
            poster: e.data.Poster,
            cast: e.data.Actors.split(","),
            awards: e.data.Awards,
            country: e.data.Country,
            director: e.data.Director,
            writer: e.data.Writer,
            genre: e.data.Genre.split(","),
            primaryGenre: e.data.Genre.split(",")[0],
            language: e.data.Language,
            metascore: e.data.Metascore,
            description: e.data.Plot,
            rated: e.data.Rated,
            release: e.data.Released,
            year: e.data.Released.split(" ")[2],
            runTime: e.data.Runtime,
            imdbID: e.data.imdbID,
            imdbRating: Math.floor(e.data.imdbRating * 10)
          };
          $scope.movies.$add(movie);
          $scope.viewMovie = movie;
          $scope.reviews.num = movie.id;
          document.location.hash = "#/Movie";
        }
        else
        {
          if(unique){
            alert("Sorry movie not found!");
          }
          else{
            alert("Movie already in database!");
          }
        }
      }, false);
  })

  .service("AppService", function() {
    this.getMovie = function(){
      var movieTitle = document.querySelector('#input').value;
      $.ajax({
          url: "https://www.omdbapi.com/?t=" + movieTitle + "&r=json",
          type: 'GET',
          dataType: 'json',
          success: function(response) {
            if(response.error){
              console.log(response.error);
            } else {
              var newM = new Event('newMovie');
              newM.data = response;
              document.dispatchEvent(newM);
            }
          }
      });
    }
  })
