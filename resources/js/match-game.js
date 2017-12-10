var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  return [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.empty();
  cardValues.forEach(function (card) {
    var $card = $('<div class="card" data-color="gray" data-value="' + card + '"></div>');
    $game.append($card);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  console.log("flipCard called");
  $card.text($card.data('value'));
  $card.css('background-color', 'blue');
  $card.text('');
  setTimeout(function () {
    console.log($card);
    $card.text('');
  }, 2500);
};
