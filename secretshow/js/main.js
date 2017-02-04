angular.module("MyApp", ["firebase"])
  .controller("MyController", function($scope, $firebaseArray) {
      var ref = firebase.database().ref("emails");
      $scope.messages = $firebaseArray(ref);

      $scope.add = function() {
        var email = $("#gEmail")[0].value;
        $scope.messages.$add(email);
        $("#gEmail").val(" ");
      }

      var easter_egg = new Konami(function() { window.location.assign("secret.html");});
      $("#title").hide(0).delay(25).fadeIn(2000);
  })
