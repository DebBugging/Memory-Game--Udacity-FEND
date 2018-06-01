//Create list of cards
let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bomb",
  "fa-bomb",
  "fa-bicycle",
  "fa-bicycle"
];

//All variables
let classDeck = $(".deck");
let classMove = $(".moves");
let win = $(".modal");
let openCards = [];
let moves = 0;
let star1 = $(".1");
let star2 = $(".2");
let matches = 0;
let clicks = 0;
let seconds = 0;
let minutes = 0;
let timer;

//Prevent opening more than 2 cards

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Add shuffled cards to HTML
function makeCard() {
  shuffle(cards).forEach(function(card) {
    classDeck.append(`<li class="card"><i class="fa ${card}"></i></li>`);
  });
}

makeCard();

//Start the game and flip cards
function startGame() {
  $(".card").on("click", function() {
    $(this).addClass("open");
    openCards.push($(this));

    //Start timer
    clicks++;
    if (clicks === 1) {
      timerOn();
    }

    if (openCards.length === 2) {
      //Cards match -stay open
      if (
        openCards[0][0].firstChild.className ===
        openCards[1][0].firstChild.className
      ) {
        openCards[0].addClass("match");
        openCards[1].addClass("match");
        openCards = [];
        matches++;
      } else {
        preventClick();
        //Cards don't match -turn over.
        setTimeout(function() {
          click();
          openCards.forEach(function(e) {
            e.removeClass("open");
            openCards = [];
          });
        }, 1000);
      }
      moves++;
    }
    //Display moves, stars, and  win
    classMove.text(`Moves: ${moves}`);
    starScore();
    gameOver();
  });
}

startGame();

//Prevent clicking on more than 2 cards
function preventClick() {
  $(".card").addClass("off-click");
}
function click() {
  $(".card").removeClass("off-click");
}

//Stars turn gray after so many moves
function starScore() {
  if (moves >= 20) {
    star1.css("color", "gray");
  }
  if (moves >= 28) {
    star2.css("color", "gray");
  }
}

//Set timer
function timerOn() {
  timer = setInterval(function() {
    $(".timer").text(`Time: ${minutes}.${seconds}`);
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

//Game over and modal pops up
function gameOver() {
  if (matches === 8) {
    console.log("WIN!");
    clearInterval(timer);
    win.css("display", "flex");

    //Click to close
    $(".close").on("click", function() {
      win.css("display", "none");
    });

    //Play again
    $(".button").on("click", function() {
      startGame(location.reload());
    });
  }
}

//Hit Restart
$(".restart").on("click", function() {
  console.log("restart");
  startGame(location.reload());
});
