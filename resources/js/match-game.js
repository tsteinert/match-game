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
  $game.data('flippedCards', []);
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
  // debugger;
  /* if flipped card is flippes again, ignore it */
  if ($card.data('isFlipped')) {
    return;
  }

  /* if already two cards are flipped, ignore further flip */
  var flippedCards = $game.data('flippedCards');
  if(flippedCards.length === 2) {
    return;
  }

  /* save flipped status for the card */
  $card.data('isFlipped', true);

  /* store card value into child node of card so it can be displayed */
  $card.text($card.data('value'));

  /* set flipped background color  */
  $card.css('background-color', 'blue');

  if(flippedCards.length === 1) {
    /* now there are two cards beeing flipped */
    flippedCards.push($card);

    var $card1 = flippedCards[0];
    var $card2 = flippedCards[1];
    if($card1.data('value') === $card2.data('value')) {
      $card1.css('background-color', 'rgb(153, 153, 153)');
      $card2.css('background-color', 'rgb(153, 153, 153)');
    } else {
      /* after a timeout, unflip both cards, unless they are equal value */
      setTimeout(function () {
        var $card1 = flippedCards[0];
        var $card2 = flippedCards[1];
        $card1.text('').css('background-color', 'rgb(32, 64, 86)');
        $card2.text('').css('background-color', 'rgb(32, 64, 86)');
      }, 1500);

    }

  } else if(flippedCards.length === 0) {
    /* first card thats flipped */
    flippedCards.push($card);

  }
};
