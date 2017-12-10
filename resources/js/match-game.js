var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function () {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
})

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var numbers = [];
  var retval = [];

  for(i = 1; i < 9; i++) {
    numbers.push(i);
    numbers.push(i);
  }

  while(numbers.length > 0) {
    var r = Math.floor(Math.random() * numbers.length);
    retval.push(numbers[r]);
    numbers.splice(r, 1);
  }

  return retval;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ['hsl(25, 85%, 65%)',
                'hsl(55, 85%, 65%)',
                'hsl(90, 85%, 65%)',
                'hsl(160, 85%, 65%)',
                'hsl(220, 85%, 65%)',
                'hsl(265, 85%, 65%)',
                'hsl(310, 85%, 65%)',
                'hsl(360, 85%, 65%)'
                ];
  $game.empty();
  $game.data('flippedCards', []);
  for(i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data('value', cardValues[i]);
    $card.data('isFlipped', false);
    $card.data('color', colors[cardValues[i] - 1]);
    $game.append($card);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
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
  $card.css('background-color', $card.data('color'));

  if(flippedCards.length === 1) {
    /* now there are two cards beeing flipped */
    flippedCards.push($card);

    var $card1 = flippedCards[0];
    var $card2 = flippedCards[1];
    if($card1.data('value') === $card2.data('value')) {
      $card1.css('background-color', 'rgb(153, 153, 153)');
      $card2.css('background-color', 'rgb(153, 153, 153)');
      flippedCards.length = 0;
    } else {
      /* after a timeout, unflip both cards, unless they are equal value */
      setTimeout(function () {
        var $card1 = flippedCards[0];
        var $card2 = flippedCards[1];
        $card1.text('').css('background-color', 'rgb(32, 64, 86)').data('isFlipped', false);
        $card2.text('').css('background-color', 'rgb(32, 64, 86)').data('isFlipped', false);
        flippedCards.length = 0;
      }, 500);

    }

  } else if(flippedCards.length === 0) {
    /* first card thats flipped */
    flippedCards.push($card);

  }
};
