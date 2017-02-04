var card1;
var card2;
var deckID;

var getDeckID = function(){
  $.ajax({
    url: "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6",
    type: 'get',
    dataType: 'json',
    success: function(response) {
      if(response.error){
        console.log(response.error);
      } else {
        deckID = response.deck_id;
        getDeck();
      }
    }
  });
}

getDeckID();

var getDeck = function(){
  $.ajax({
    url: "http://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2",
    type: 'get',
    dataType: 'json',
    success: function(response) {
      if(response.error){
        console.log(response.error);
      } else {
        $('#card1').attr("src", response.cards[0].image);
        $('#card2').attr("src", response.cards[1].image);
          //FIRST CARD SETUP
          if(response.cards[0].value == "KING" | response.cards[0].value == "QUEEN" | response.cards[0].value == "JACK"){
            card1=10;
          } else if (response.cards[0].value == "ACE") {
            card1=11;
          } else {
            card1 = response.cards[0].value;
          }

          //SECOND CARD SETUP
          if(response.cards[1].value == "KING" | response.cards[1].value == "QUEEN" | response.cards[1].value == "JACK") {
            card2 = 10;
          } else if(response.cards[1].value == "ACE") {
            card2 = 11;
          } else {
            card2 = response.cards[1].value;
          }
       }

       var total = parseInt(card1) + parseInt(card2);
       if (total == 21){
         $("#didIWin").html("YOU GOT BLACKJACK");
       } else {
         $("#didIWin").html("Try Again!");
       }
    }
  });
}

$("#letsGamble").on('click', function() {
  getDeck();
});
